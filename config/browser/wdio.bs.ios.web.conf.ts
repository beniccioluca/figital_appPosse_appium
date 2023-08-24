import { config } from '../wdio.shared.conf';

config.user = process.env.BROWSERSTACK_USER;
config.key = process.env.BROWSERSTACK_KEY;

config.specs = [
  './test/specs/**/*.web.spec.ts'
];

config.capabilities = [
  {
    'bstack:options' : {
      "osVersion" : "15.4",
      "deviceName" : "iPhone XS",
      "realMobile" : "true",
      "projectName" : "<inserir-nome-do-projeto>",
      "buildName" : "<inserir-build-name>",
      "sessionName" : "<inserir-session-name>",
      },
      "browserName" : "safari", 
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