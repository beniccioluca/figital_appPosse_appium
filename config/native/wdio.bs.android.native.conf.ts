import { config } from '../wdio.shared.conf';

config.user = process.env.BROWSERSTACK_USER;
config.key = process.env.BROWSERSTACK_KEY;

config.specs = [
  './test/specs/**/*.native.spec.ts'
];

config.capabilities = [
  {
    "platformName" : "android",
    "appium:app" : process.env.BROWSERSTACK_APP_ANDROID,
    'bstack:options' : {
      "osVersion" : "10.0",
      "deviceName" : "Samsung Galaxy Note 20 Ultra",
      "realMobile" : "true",
      "appiumVersion" : "1.22.0",
      "projectName" : "<inserir-nome-do-projeto>",
      "buildName" : "<inserir-build-name>",
      "sessionName" : "<inserir-session-name>",
    },
    "appium:autoGrantPermissions": true,
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