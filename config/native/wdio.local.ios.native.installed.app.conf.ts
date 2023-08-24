import { config } from '../wdio.shared.conf';

config.specs = [
    './test/specs/**/*.native.spec.ts'
];

config.capabilities = [
    {
        platformName: "ios",
        "appium:platformVersion": "15.4",
        "appium:deviceName": "iPhone 13",
        "appium:automationName": "XCUITest",
        "appium:autoGrantPermissions":"true",
        "appium:autoAcceptAlerts": "true",
        "appium:appPackage": "<iphone_app_package>",
        "appium:appActivity": "<iphone_app_activity>",
      }
]

export { config };