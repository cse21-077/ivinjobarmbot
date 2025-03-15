import { vpsService } from '../lib/vps-service'

async function testMT5Connection() {
  try {
    await vpsService.connect()
    const instance = await vpsService.findAvailableInstance()
    
    const connected = await vpsService.connectMT5(
      instance,
      'your_mt5_account',
      'your_mt5_password',
      'your_mt5_server'
    )
    
    console.log('✅ MT5 connection:', connected)
    
    if (connected) {
      await vpsService.setTradingPair(instance, 'EURUSD')
      console.log('✅ Trading pair set')
      
      await vpsService.disconnectMT5(instance)
      console.log('✅ MT5 disconnected')
    }
    
    await vpsService.disconnect()
  } catch (error) {
    console.error('❌ MT5 test failed:', error)
  }
}

testMT5Connection()