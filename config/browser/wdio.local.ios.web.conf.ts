import { config } from '../wdio.shared.conf';

config.specs = [
    './test/specs/**/*.web.spec.ts'
];

config.capabilities = [
    {
        platformName: "ios",
        "appium:platformVersion": "15.4",
        "appium:deviceName": "iPhone 13",
        "appium:automationName": "XCUITest",
        "browserName": "Safari",
        "appium:autoGrantPermissions":"true",
        "appium:autoAcceptAlerts": "true",
      }
]

export { config };