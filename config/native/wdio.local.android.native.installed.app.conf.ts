import { config } from '../wdio.shared.conf';

config.specs = [
    './test/specs/3203*.native.spec.ts'
];

config.capabilities = [
    {
        "platformName": "Android",
        "appium:platformVersion": "10.0",
        "appium:deviceName": "SM-A217M",
        "appium:automationName": "UIAutomator2",
        "appium:autoGrantPermissions": true,
        "appium:udid": "RX8N608Q2EF",//RX8NB0642LY
        "appium:appPackage": "com.viavarejo.app",
        "appium:appActivity": "com.vivarejo.login.base.ui.LoginActivity",
     }
   
]

export { config };