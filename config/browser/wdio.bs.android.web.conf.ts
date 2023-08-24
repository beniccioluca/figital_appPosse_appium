import { config } from '../wdio.shared.conf';
import path from 'path';

config.user = process.env.BROWSERSTACK_USER;
config.key = process.env.BROWSERSTACK_KEY;

config.specs = [
  './test/specs/**/*.web.spec.ts'
];

config.capabilities = [
  {
    "platformName" : "android",
    'bstack:options' : {
      "osVersion" : "10.0",
      "deviceName" : "Samsung Galaxy Note 20 Ultra",
      "realMobile" : "true",
      "appiumVersion" : "1.22.0",
      "projectName" : "<inserir-nome-do-projeto>",
      "buildName" : "<inserir-build-name>",
      "sessionName" : "<inserir-session-name>",
    },
    "browserName": "chrome",
    "appium:chromedriverArgs": [ `user-data-dir=${path.join(process.cwd(),"/support/browser_profiles/chrome_blank_profile")}` ],
    "appium:autoGrantPermissions": true
  }
]

delete config.port;

config.services = [
  [
    'browserstack',
    {
      browserstackLocal: false
    }
  ]
];

export { config };