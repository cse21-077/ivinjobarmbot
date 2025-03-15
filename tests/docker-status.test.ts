import { vpsService } from '../lib/vps-service'

async function testDockerStatus() {
  try {
    await vpsService.connect()
    const instance = await vpsService.findAvailableInstance()
    console.log('✅ Available instance:', instance)
    await vpsService.disconnect()
  } catch (error) {
    console.error('❌ Docker status check failed:', error)
  }
}

testDockerStatus()