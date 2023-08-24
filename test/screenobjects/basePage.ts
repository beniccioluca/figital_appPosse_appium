import BaseTestLocation from "./baseTestLocation";
import Utils from "../../support/code/common";
import allureReporter from "@wdio/allure-reporter";

export default class BasePage implements BaseTestLocation {
    private _onPage : boolean = false;

    name (pageName : string) : string {
        return `${process.env.APP_OS} Web: ${pageName}`;
    }

    async enterPage () : Promise<void> {
        if (!this._onPage) {
            this._onPage = true;
            await this.switchContext();
            await this.checkLoaded();
        }
    }

    leavePage () : void {
        if (this._onPage) {
            this._onPage = false;
        }
    }

    async snapShot (pageName: string) : Promise<void> {
        allureReporter.addAttachment(pageName, await driver.takeScreenshot(), "image");
    }

    buildContextSelector (rawSelector : string) : string {
        return rawSelector;
    }

    async switchContext (contextName: string = "webview") : Promise<void> {
        await Utils.changeDriverContext(contextName);
    }

    async checkLoaded (element : Promise<WebdriverIO.Element> = undefined) : Promise<void> {
        await element.then(
            async (foundElement : WebdriverIO.Element) => { 
                return await foundElement.waitForExist({ timeout : 15000 });
            }
        );
    }
}