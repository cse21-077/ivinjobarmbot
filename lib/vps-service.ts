import { EC2Client, StartInstancesCommand, DescribeInstancesCommand } from "@aws-sdk/client-ec2";
import { SSMClient, SendCommandCommand } from "@aws-sdk/client-ssm";
import { Client, ClientChannel } from 'ssh2';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Constants
const RETRY_ATTEMPTS = 3;
const RETRY_BACKOFF_MS = 1000; // Start with 1 second, will be exponentially increased
const CONNECT_TIMEOUT_MS = 60000; // 60 seconds timeout for VPS connections
const MT5_START_TIMEOUT_MS = 30000; // 30 seconds timeout for MT5 to start

// Configuration interface for VPS credentials
export interface VpsCredentials {
  derivToken: string;
  accountId: string;
  server: string;
  pairs: string[];
  direction: 'buy' | 'sell';
  riskPercentage: number;
  lotSize: number;
  maxTradesPerDay: number;
  stopLoss: number;
  takeProfit: number;
}

// VPS connection result interface
export interface VpsConnectionResult {
  success: boolean;
  message: string;
  connectionId?: string;
  error?: string;
  timestamp?: number;
}

// Connection monitoring state
interface ConnectionMonitorState {
  lastCheck: number;
  isConnected: boolean;
  connectionId: string;
  reconnectAttempts: number;
}

// Map to track active connections
const activeConnections = new Map<string, ConnectionMonitorState>();

interface VPSConfig {
  host: string;
  username: string;
  privateKeyPath: string;
  port?: number;
}

import * as fs from 'fs';
import * as path from 'path';

class VPSService {
  private config: VPSConfig;
  private client: Client;
  private shell: ClientChannel | null = null;
  private sshClient: Client;

  constructor(config: VPSConfig) {
    this.config = config;
    this.client = new Client();
    this.sshClient = new Client();
  }

  private async execCommand(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.client.exec(command, (err: Error | undefined, stream: ClientChannel) => {
        if (err) reject(err);
        
        let output = '';
        stream.on('data', (data: Buffer) => {
          output += data.toString();
        });
        
        stream.on('close', () => {
          resolve(output);
        });
        
        stream.on('error', (error: Error) => {
          reject(error);
        });
      });
    });
  }

  async connect(): Promise<void> {
    try {
      const privateKey = readFileSync(resolve(process.cwd(), this.config.privateKeyPath));
      
      return new Promise((resolve, reject) => {
        this.client
          .on('ready', () => {
            console.log('SSH connection established');
            resolve();
          })
          .on('error', (err: Error) => {
            console.error('SSH connection error:', err);
            reject(new Error('Failed to connect to VPS'));
          })
          .connect({
            host: this.config.host,
            username: this.config.username,
            privateKey,
            port: this.config.port || 22
          });
      });
    } catch (error) {
      console.error('VPS connection error:', error);
      throw new Error('Failed to connect to VPS');
    }
  }

  async findAvailableInstance(): Promise<number> {
    try {
      const output = await this.execCommand('docker ps --format "{{.Names}}"');
      const instances = output
        .split('\n')
        .filter(name => name.startsWith('mt5-instance-'))
        .map(name => parseInt(name.replace('mt5-instance-', '')));

      // Find first available instance (1-30)
      for (let i = 1; i <= 30; i++) {
        if (!instances.includes(i)) {
          return i;
        }
      }
      throw new Error('No available MT5 instances');
    } catch (error) {
      console.error('Error finding available instance:', error);
      throw error;
    }
  }

  async connectMT5(instanceId: number, accountId: string, password: string, server: string): Promise<boolean> {
    try {
      // Validate inputs
      if (!accountId || !password || !server) {
        throw new Error('Invalid MT5 credentials');
      }

      console.log('Connecting to MT5 with:', {
        instanceId,
        accountId,
        server,
        timestamp: new Date().toISOString()
      });

      // Check if Docker container is running
      const containerCheck = await this.execCommand(
        `docker ps -q -f name=mt5-instance-${instanceId}`
      );
      if (!containerCheck) {
        throw new Error(`Docker container mt5-instance-${instanceId} not running`);
      }

      // Check if MT5 is already running
      const processCheck = await this.execCommand(
        `docker exec mt5-instance-${instanceId} wine tasklist /FI "IMAGENAME eq terminal64.exe" /NH`
      );
      if (processCheck.includes('terminal64.exe')) {
        console.log('MT5 process already running, killing existing instance...');
        await this.execCommand(
          `docker exec mt5-instance-${instanceId} wine taskkill /F /IM terminal64.exe`
        );
        // Wait for process to fully terminate
        await new Promise(resolve => setTimeout(resolve, 5000));
      }

      // Start MT5 with credentials
      const command = `docker exec mt5-instance-${instanceId} wine /app/MetaTrader5/terminal64.exe --login ${accountId} --password ${password} --server "${server}" --auto-start`;
      const output = await this.execCommand(command);
      console.log('MT5 start command output:', output);

      // Wait for connection to establish
      await new Promise(resolve => setTimeout(resolve, 10000));

      // Verify connection multiple times
      let connectionAttempts = 0;
      const maxAttempts = 3;
      
      while (connectionAttempts < maxAttempts) {
        const isConnected = await this.checkConnection(instanceId);
        if (isConnected) {
          console.log('MT5 connection verified successfully');
          return true;
        }
        console.log(`Connection check attempt ${connectionAttempts + 1} failed, retrying...`);
        await new Promise(resolve => setTimeout(resolve, 5000));
        connectionAttempts++;
      }

      throw new Error('Failed to establish MT5 connection after multiple attempts');
    } catch (error) {
      console.error('MT5 connection error:', error);
      throw error;
    }
  }

  async disconnectMT5(instanceId: number): Promise<boolean> {
    try {
      const command = `docker exec mt5-instance-${instanceId} wine taskkill /F /IM terminal64.exe`;
      await this.execCommand(command);
      return true;
    } catch (error) {
      console.error('MT5 disconnect error:', error);
      throw error;
    }
  }

  async setTradingPair(instanceId: number, pair: string): Promise<boolean> {
    try {
      // Debug: List available symbols first
      const listCommand = `docker exec mt5-instance-${instanceId} wine /app/MetaTrader5/terminal64.exe --list-symbols`;
      const symbols = await this.execCommand(listCommand);
      console.log('Available symbols:', symbols);

      // Set the trading pair
      const command = `docker exec mt5-instance-${instanceId} wine /app/MetaTrader5/terminal64.exe --symbol "${pair}"`;
      await this.execCommand(command);
      return true;
    } catch (error) {
      console.error('Error setting trading pair:', error);
      return false;
    }
  }

  async checkConnection(instanceId: number): Promise<boolean> {
    try {
      // Check if process is running
      const processCommand = `docker exec mt5-instance-${instanceId} wine tasklist /FI "IMAGENAME eq terminal64.exe" /NH`;
      const processOutput = await this.execCommand(processCommand);
      
      if (!processOutput.includes('terminal64.exe')) {
        console.log('MT5 process not found');
        return false;
      }

      // Check MT5 logs for connection status
      const logCommand = `docker exec mt5-instance-${instanceId} cat "/app/MetaTrader5/MQL5/Logs/$(date +%Y%m%d).log"`;
      const logOutput = await this.execCommand(logCommand);
      
      console.log('MT5 log output:', logOutput);

      // Look for connection indicators in log
      const isConnected = 
        logOutput.includes('Connection established') || 
        logOutput.includes('Connected to') ||
        logOutput.includes('Login successful');

      console.log('Connection status:', isConnected);
      return isConnected;
    } catch (error) {
      console.error('Connection check failed:', error);
      return false;
    }
  }

  async checkContainerStatus(instanceId: number): Promise<string> {
    try {
      const command = `docker ps -a --filter "name=mt5-instance-${instanceId}" --format "{{.Status}}"`;
      const output = await this.execCommand(command);
      console.log(`Container mt5-instance-${instanceId} status:`, output);
      return output;
    } catch (error) {
      console.error(`Failed to check container status: ${error}`);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.shell) {
      this.shell.end();
      this.shell = null;
    }
    this.client.end();
  }

  async startVPS() {
    return new Promise((resolve, reject) => {
      this.sshClient.on('ready', () => {
        console.log('SSH Connection established');
        resolve(true);
      }).connect({
        host: process.env.VPS_HOST || '',
        port: parseInt(process.env.VPS_PORT || '22'),
        username: process.env.VPS_USERNAME || '',
        privateKey: fs.readFileSync(path.resolve(process.env.VPS_PRIVATE_KEY || ''))
      });
    });
  }

  async connectToMetaTrader(config: any) {
    // Implement MT5 connection via SSH
    return new Promise((resolve, reject) => {
      this.sshClient.exec('wine /app/MetaTrader5/terminal64.exe', (err, stream) => {
        if (err) reject(err);
        stream.on('data', (data: Buffer) => {
          console.log('MT5 OUTPUT:', data.toString());
        });
        resolve(true);
      });
    });
  }
}

export const vpsService = new VPSService({
  host: process.env.VPS_HOST || '',
  username: process.env.VPS_USERNAME || '',
  privateKeyPath: process.env.VPS_PRIVATE_KEY || '',
  port: parseInt(process.env.VPS_PORT || '22')
});

export default VPSService;