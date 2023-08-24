[javascript-image]: https://img.shields.io/badge/javascript-red
[javascript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[webdriverio-image]:https://img.shields.io/badge/webdriverio-7.17.6-orange
[webdriverio-url]:https://webdriver.io/docs/gettingstarted
[mochajs-image]:https://img.shields.io/badge/mocha-10.0.0-yellow
[mochajs-url]:https://mochajs.org/
[appium-image]:https://img.shields.io/badge/appium-1.22.3-purple
[appium-url]:https://appium.io/
# Project structure cypress + mocha + allure
[![JavaScript Version][javascript-image]][javascript-url]
[![WebdriverIO Version][webdriverio-image]][webdriverio-url]
[![MochaJS Version][mochajs-image]][mochajs-url]
[![Appium Version][appium-image]][appium-url]

Estrutura do projeto:
```
.
├── apps
│   ├── android
│   ├── iOS
│   └── leiame.txt
├── config
│   ├── browser
│   │   ├── wdio.bs.android.browser.conf.js
│   │   ├── wdio.bs.ios.browser.conf.js
│   │   ├── wdio.local.android.browser.conf.js
│   │   └── wdio.local.ios.browser.conf.js
│   ├── native
│   │   ├── wdio.bs.android.native.conf.js
│   │   ├── wdio.bs.ios.native.conf.js
│   │   ├── wdio.local.android.native.conf.js
│   │   └── wdio.local.ios.native.conf.js
│   ├── os.mobile.js
│   └── wdio.shared.conf.js
├── test
│   ├── screenobjects
│   │   ├── common
│   │   ├── departaments
│   │   └── home
│   ├── specs
│   │   ├── departaments
│   │   │   └── departaments.spec.js
│   │   └── home
│   └──     └── home.spec.js
├── .gitignore
├── template.env
├── babel.config.js
├── jsconfig.json
├── package.json
└── README.md
```

Assumimos que você possui NodeJS instalado (versão 14 ou superior) e que tenha executado o scaffolding do E2E ou realizado clone deste projeto. Agora você pode executar seu projeto local.

## Abaixo segue alguns comandos a serem utilizados com o projeto:
### - BrowserStack:

Para executar o webdriverIO com testes android, usando o aliase criado no arquivo package.json:
```
APP=android npm run native.bs.android
```

Para executar o webdriverIO com testes ios, usando o aliase criado no arquivo package.json:
```
APP=ios npm run native.bs.ios
```
Para executar o webdriverIO com testes browser android, usando o aliase criado no arquivo package.json:
```
APP=browser npm run browser.bs.android
```

Para executar o webdriverIO com testes browser ios, usando o aliase criado no arquivo package.json:
```
APP=browser npm run browser.bs.ios
```

### - Local:

Para executar o webdriverIO com testes android, usando o aliase criado no arquivo package.json:
```
APP=android npm run native.android
```

Para executar o webdriverIO com testes ios, usando o aliase criado no arquivo package.json:
```
APP=ios npm run native.ios
```

Para executar o webdriverIO com testes browser android, usando o aliase criado no arquivo package.json:
```
APP=browser npm run browser.android
```

Para executar o webdriverIO com testes browser ios, usando o aliase criado no arquivo package.json:
```
APP=browser npm run browser.ios
```

## Alternando execução entre os browser ou nativos  mobile

```
APP=inseir-o-sistema-operacional-mobile
```

Os "APPs" disponíveis são:
- android (app native)
- ios (app native)
- browser

## Configurações para executar testes usando BrowserStack

Usar o arquivo "**.env**" e preencher os seguintes os valores para as seguintes variáveis:
- BROWSERSTACK_USER=inserir-user-browserstack

*Usuário cadastrado no browserstack*

- BROWSERSTACK_KEY=inserir-key-browserstack

*Key do usuário que foi cadastrado no browserstack*

- BROWSERSTACK_APP_ANDROID=inserir-identif-app-browserstack

*Identificado do app android gerado após realizado o upload do mesmo no browserstack*

- BROWSERSTACK_APP_IOS=inserir-identif-app-browserstack

*Identificado do app ios gerado após realizado o upload do mesmo no browserstack*

Por padrão ao executar o Scaffolding E2E, será gerado o arquivo **template.env**. Após executar o scaffolding, renomear o arquivo para **.env** e realizar as configurações como citada acima.

### Demais execuções via pipeline, será utilizado via gitHub Action.