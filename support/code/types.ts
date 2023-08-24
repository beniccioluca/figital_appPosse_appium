interface TestResult {
    error: Error,
    result: any,
    duration: number,
    passed: Boolean,
    retries: Object
}

interface WebdriverIOConfig {
    [key: string]: any,
    onPrepare: (config: Object, capabilities: Array<Object>) => void,
    onWorkerStart: (cid: string, caps: any, specs: any, args: any, execArgv: any) => void,
    onWorkerEnd: (cid: string, exitCode: number, specs: any, retries: number) => void,
    beforeSession: (config: Object, capabilities: Array<Object>, specs: Array<string>, cid: string) => void,
    before: (capabilities: Array<Object>, specs: Array<string>, browser: Object) => void,
    beforeCommand: (commandName: string, args: Array<string>) => void,    
    beforeSuite: (suite: Object) => void,    
    beforeTest: (test: any, context: any) => void,    
    beforeHook: (test: any, context: any) => void,    
    afterHook: (test: any, context: any, result: TestResult) => void,    
    afterTest: (test: any, context: any, result: TestResult) => void,    
    afterSuite: (suite: Object) => void,    
    afterCommand: (commandName: string, args: Array<string>, result: number, error: Object) => void,    
    after: (result: number, capabilities: Array<Object>, specs: Array<string>) => void,    
    afterSession: (config: Object, capabilities: Array<Object>, specs: Array<string>) => void,    
    onComplete: (exitCode: Object, config: Object, capabilities: Array<Object>, results: Object) => void,
    onReload: (oldSessionId: string, newSessionId: string) => void
}

export { TestResult, WebdriverIOConfig };