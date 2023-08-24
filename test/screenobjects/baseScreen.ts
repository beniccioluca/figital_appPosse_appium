import BaseTestLocation from "./baseTestLocation";
import Utils from "../../support/code/common";
import allureReporter from "@wdio/allure-reporter";

export default class BaseScreen implements BaseTestLocation {
    private _onScreen : boolean = false;

    get menuCatalogo() { return $(this.buildContextSelector(`UiSelector().className("android.widget.TextView").text("Catálogo")`));}
    get menuPedidos() { return $(this.buildContextSelector(`UiSelector().className("android.widget.TextView").text("Pedidos")`));}
    get menuCarrinho() { return $(this.buildContextSelector(`UiSelector().className("android.widget.TextView").text("Carrinho")`));}

    name (screenName : string) : string {
        return `${process.env.APP_OS}: ${screenName}`;
    }

    async enterScreen () : Promise<void> {
        if (!this._onScreen) {
            this._onScreen = true;
            await this.switchContext();
            await this.checkLoaded();
        }
    }

    leaveScreen () : void {
        if (this._onScreen) {
            this._onScreen = false;
        }
    }

    async snapShot (screenName: string) : Promise<void> {
        allureReporter.addAttachment(screenName, await driver.takeScreenshot(), "image");
    }

    buildContextSelector (selector : string, scrollToFind : boolean = false) : string {
        try {
            if (scrollToFind) {
                selector = `android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new ${selector})`;
            } else {
                selector = `android=new ${selector}`
            }
            
            return selector;
        } catch (excep) {
            throw excep;
        }
    }

    async switchContext (contextName : string = "native") : Promise<void> {
        await Utils.changeDriverContext(contextName);
    }

    async checkLoaded (element : Promise<WebdriverIO.Element> = undefined) : Promise<void> {
        await element.then(
            async (foundElement : WebdriverIO.Element) => { 
                return await foundElement.waitForDisplayed({ timeout : 10000 });
            }
        );
    }

    async selecionarMenuCatalogo(): Promise<void> {
        const labelMenuCatalogo = await this.menuCatalogo
        await labelMenuCatalogo.click();
    }

    async selecionarMenuPedidos(): Promise<void> {     
        const labelMenuPedidos = await this.menuPedidos
        await labelMenuPedidos.click();
    }

    async selecionarMenuCarrinho(): Promise<void> {
        const labelMenuCarrinho = await this.menuCarrinho
        await labelMenuCarrinho.click();
    }
}