import { config } from '../wdio.shared.conf';

config.specs = [
    './test/specs/appPosse.native.spec.ts'
];

config.capabilities = [
    {
        "platformName": "Android",
        "appium:platformVersion": "10.0",
        "appium:deviceName": "SM-A217M",
        "appium:automationName": "UIAutomator2",
        "appium:autoGrantPermissions": true,
        "appium:udid": "RX8N603XFQL",//RX8NB0642LY
        "appium:appPackage": "com.viavarejo.app.identificador",
        "appium:appActivity": "com.viavarejo.app.identificador.ui.IdentificadorActivity",
    }
    
]

export { config };