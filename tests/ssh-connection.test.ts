import { vpsService } from '../lib/vps-service';

describe('VPS SSH Connection', () => {
  jest.setTimeout(30000); // 30 seconds timeout

  afterEach(async () => {
    try {
      await vpsService.disconnect();
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  });

  it('should connect to VPS successfully', async () => {
    try {
      await vpsService.connect();
      expect(true).toBe(true);
      console.log('✅ SSH connection successful');
    } catch (error) {
      console.error('❌ SSH connection failed:', error);
      throw error;
    }
  });

  it('should have valid SSH credentials', () => {
    expect(process.env.VPS_HOST).toBeTruthy();
    expect(process.env.VPS_USERNAME).toBeTruthy();
    expect(process.env.VPS_PRIVATE_KEY).toBeTruthy();
  });
});