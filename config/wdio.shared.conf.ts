import { TestResult, WebdriverIOConfig } from "../support/code/types";
import * as dotenv from 'dotenv';
import allureReporter from "@wdio/allure-reporter";
import find from 'find-process';

dotenv.config();

const config: WebdriverIOConfig = {
  //port: 4723,
  include: [
    './{test,support}/**/*.ts',
  ],
  exclude: [
    './node_modules/**/*.*'
  ],
  maxInstances: 1,
  logLevels: { // Set specific log levels per logger - Levels of logging verbosity: trace | debug | info | warn | error | silent
      webdriver: 'info',
      webdriverio: 'info',
      '@wdio/appium-service': 'info',
      '@wdio/browserstack-service': 'info',
      '@wdio/devtools-service': 'info',
      '@wdio/sauce-service': 'info',
      '@wdio/mocha-framework': 'info',
      '@wdio/jasmine-framework': 'info',
      '@wdio/local-runner': 'info',
      '@wdio/sumologic-reporter': 'info',
      '@wdio/cli': 'info',
      '@wdio/config': 'info',
      '@wdio/utils': 'info'
  },
  bail: 0,
  baseUrl: "https://www.google.com.br/",
  waitforTimeout: 20000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 5,
  services: [
    [
      "appium",
      {
        args: {
          address: 'localhost',
          port: 4721,
          relaxedSecurity: true
        }
      }
    ]
  ],
  framework: "mocha",
  specFileRetries: 0,
  specFileRetriesDelay: 3,
  specFileRetriesDeferred: true,
  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
      }
    ]
  ],
  mochaOpts: {
    ui: "bdd",
    timeout: 120000,
  },
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
        transpileOnly: true,
        project: 'tsconfig.json'
    }
  },
  onPrepare: async function (config: Object, capabilities: Array<Object>): Promise<void> {
    if (this.port) {
      await find('port', this.port).then(
        function (list: any[]) {
          list.forEach((entry: any, entryIndex: number, entryArray:any[]) => {
            process.kill(entry.pid, 'SIGTERM');
          })          
        },
        function (err: Error) {
          console.log(err.stack || err);
        }
      );
    }
  },
  onWorkerStart: function (cid: string, caps: any, specs: any, args: any, execArgv: any) {},
  onWorkerEnd: function (cid: string, exitCode: number, specs: any, retries: number) {},
  beforeSession: function (config: Object, capabilities: Array<Object>, specs: Array<string>, cid: string) {},
  before: function (capabilities: Array<Object>, specs: Array<string>, browser: Object) {},
  beforeCommand: function (commandName: string, args: Array<string>) {},
  beforeSuite: function (suite: Object) {},
  beforeTest: function (test: any, context: any) {},
  beforeHook: function (test: any, context: any) {},
  afterHook: function (test: any, context: any, result: TestResult) {},
  afterTest: async function (test: any, context: any, result: TestResult) {
    if (result.error) {
      allureReporter.addAttachment("erro_teste", await driver.takeScreenshot(), "image");
    }
  },
  afterSuite: function (suite: Object) {},
  afterCommand: function (commandName: string, args: Array<string>, result: number, error: Object) {},
  after: function (result: number, capabilities: Array<Object>, specs: Array<string>) {},
  afterSession: function (config: Object, capabilities: Array<Object>, specs: Array<string>) {},
  onComplete: function(exitCode: Object, config: Object, capabilities: Array<Object>, results: Object) {},
  onReload: function(oldSessionId: string, newSessionId: string) {}
};

export { config };