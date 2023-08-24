import { config } from '../wdio.shared.conf';

config.user = process.env.BROWSERSTACK_USER;
config.key = process.env.BROWSERSTACK_KEY;


config.capabilities = [
  {
    "platformName" : "ios",
    "appium:platformVersion" : "15.4",
    "appium:deviceName" : "iPhone XS",
    "appium:app" : process.env.BROWSERSTACK_APP_IOS,
    'bstack:options' : {
      "projectName" : "<inserir-nome-do-projeto>",
      "buildName" : "<inserir-build-name>",
      "sessionName" : "<inserir-session-name>",
    },
    "appium:autoAcceptAlerts": "true",
  }
]

config.services = [
  [
    'browserstack',
    {
      browserstackLocal: false
    }
  ]
];

export { config };