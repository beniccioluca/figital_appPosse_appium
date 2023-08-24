import * as path from 'path';
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
        "appium:app": path.join(process.cwd(), "/apps/<arquivo_ipa>"),
        "appium:autoGrantPermissions":"true",
        "appium:autoAcceptAlerts": "true",
      }
]

export { config };