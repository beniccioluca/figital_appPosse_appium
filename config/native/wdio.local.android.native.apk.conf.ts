import * as path from 'path';
import { config } from '../wdio.shared.conf';

config.specs = [
    './test/specs/**/*.native.spec.ts'
];

config.capabilities = [
    {
        platformName: "Android",
        "appium:platformVersion": "12.0",
        "appium:deviceName": "AVD Emulator",
        "appium:automationName": "UIAutomator2",
        "appium:app": path.join(process.cwd(), "/apps/youtube-go-3-25-54.apk"),
        "appium:autoGrantPermissions": true,
        "appium:udid": "RX8NB0642LY"
    }
]

export { config };