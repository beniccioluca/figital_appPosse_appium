import BaseScreen from "../baseScreen";

class AppPosse_AtribuirPosseScreen extends BaseScreen {
   get tituloPagina() { return $(this.buildContextSelector(`UiSelector().className("android.widget.TextView").text("Atribuição de posse")`))}   
   get campoEmpresaMatricula() { return $(this.buildContextSelector(`UiSelector().resourceId("com.viavarejo.app.identificador:id/etEnrollment")`)); }  
   get botaoContinuar() { return $(this.buildContextSelector(`UiSelector().className("android.widget.Button").text("Continuar")`)); }
   get modalPosseExistente() { return $(this.buildContextSelector(`UiSelector().resourceId("com.viavarejo.app.identificador:id/item")`)); } 
   get botaoModalSim() { return $(this.buildContextSelector(`UiSelector().resourceId("com.viavarejo.app.identificador:id/btYes")`)); }
   get botaoSair() { return $(this.buildContextSelector(`UiSelector().className("android.widget.Button").text("Sair")`)); }

    name(screenName: string = "Atribuir Posse - App Posse"): string {
        return super.name(screenName);
    }

    async checkLoaded (element: Promise<WebdriverIO.Element> = this.tituloPagina): Promise<void> {
        await super.checkLoaded(element);
    }

    async snapShot(screenName: string = this.name()): Promise<void> {
        await super.snapShot(screenName);
    }

    async inserirDadosVendedor(vendedor: {[key:string]:any}): Promise<void> {
        await this.enterScreen();
 
        const labelEmpresaMatricula =  await this.campoEmpresaMatricula
        await labelEmpresaMatricula.setValue(`${vendedor.empresa}${vendedor.matricula}`);

        this.leaveScreen(); 
     }

     async selecionarContinuar(): Promise<void> {
        await this.enterScreen();
 
        const labelContinuar =  await this.botaoContinuar
        await labelContinuar.click();

        this.leaveScreen(); 
     }
     
     async verificaPosseExistente(): Promise<void> {

        if((this.modalPosseExistente).isDisplayed()){
            const botaoSim = await this.botaoModalSim
            await botaoSim.click(); 
        }else{
            this.leaveScreen();
        }       
     }
};

export default new AppPosse_AtribuirPosseScreen();