declare module 'ssh2' {
  import { EventEmitter } from 'events';
  
  export class Client extends EventEmitter {
    connect(config: {
      host: string;
      port?: number;
      username: string;
      privateKey: Buffer;
    }): void;
    
    exec(command: string, callback: (err: Error | undefined, stream: any) => void): void;
    end(): void;
  }

  export interface ClientChannel extends EventEmitter {
    end(): void;
    on(event: string, listener: (data: any) => void): this;
  }
}