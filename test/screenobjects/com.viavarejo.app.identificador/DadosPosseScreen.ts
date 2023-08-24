import BaseScreen from "../baseScreen";

class AppPosse_DadosPosseScreen extends BaseScreen {
   get tituloPagina() { return $(this.buildContextSelector(`UiSelector().className("android.widget.TextView").text("Dados de posse")`))}      
   get botaoSair() { return $(this.buildContextSelector(`UiSelector().className("android.widget.Button").text("Sair")`)); }

   name(screenName: string = "Termo Aceite - App Posse"): string {
        return super.name(screenName);
    }

    async checkLoaded (element: Promise<WebdriverIO.Element> = this.tituloPagina): Promise<void> {
        await super.checkLoaded(element);
    }

    async snapShot(screenName: string = this.name()): Promise<void> {
        await super.snapShot(screenName);
    }

    async validaMatriculaUsuarioPosse(vendedor: {[key:string]:any}): Promise<void> {
        await this.enterScreen();
    
        const labelUsuarioPosse = await $(this.buildContextSelector(`UiSelector().className("android.widget.TextView").textContains("${vendedor.empresa}${vendedor.matricula}")`));
        await labelUsuarioPosse.isDisplayed();
        
        this.leaveScreen();
     }
     
     async selecionarSair(): Promise<void> {
        await this.enterScreen();

        const labelSair =  await this.botaoSair
        await labelSair.click();
        
        this.leaveScreen(); 
     }
};

export default new AppPosse_DadosPosseScreen();