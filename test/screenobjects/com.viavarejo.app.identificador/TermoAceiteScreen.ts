import BaseScreen from "../baseScreen";

class AppPosse_TermoAceiteScreen extends BaseScreen {
   get tituloPagina() { return $(this.buildContextSelector(`UiSelector().className("android.widget.TextView").text("Termos de Posse")`))}
   get botaoAceitar() { return $(this.buildContextSelector(`UiSelector().className("android.widget.Button").text("Aceitar")`,true)); }      
   
   name(screenName: string = "Termo Aceite - App Posse"): string {
        return super.name(screenName);
    }

    async checkLoaded (element: Promise<WebdriverIO.Element> = this.tituloPagina): Promise<void> {
        await super.checkLoaded(element);
    }

    async snapShot(screenName: string = this.name()): Promise<void> {
        await super.snapShot(screenName);
    }

    async aceitarTermoPosse(): Promise<void> {
        await this.enterScreen();
    
        const labelAceitar = await this.botaoAceitar
        await labelAceitar.click();
        
        this.leaveScreen();
     }   
};

export default new AppPosse_TermoAceiteScreen();