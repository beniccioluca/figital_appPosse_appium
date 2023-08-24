import { config } from '../wdio.shared.conf';
import path from 'path';

config.specs = [
    './test/specs/**/*.web.spec.ts'
];

config.capabilities = [
    {
        "platformName": "Android",
        "appium:platformVersion": "12.0",
        "appium:deviceName": "AVD Emulator",
        "appium:automationName": "UIAutomator2",
        "browserName": "chrome",
        "appium:chromedriverArgs": [ `user-data-dir=${path.join(process.cwd(),"/support/browser_profiles/chrome_blank_profile")}` ],
        "appium:autoGrantPermissions": true,
        "appium:udid": "emulator-5554"
    }
]

export { config };