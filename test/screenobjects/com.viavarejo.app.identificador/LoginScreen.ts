import BaseScreen from "../baseScreen";

class AppPosse_LoginScreen extends BaseScreen {
   
   get logoPrincipal() { return $(this.buildContextSelector(`UiSelector().className("android.widget.ImageView")`)); }  
   get campoFilial() { return $(this.buildContextSelector(`UiSelector().resourceId("com.viavarejo.app.identificador:id/filialLayout").childSelector(new UiSelector().className("android.widget.EditText"))`)); }   
   get campoEmpresaMatricula() { return $(this.buildContextSelector(`UiSelector().resourceId("com.viavarejo.app.identificador:id/matriculaLayout").childSelector(new UiSelector().className("android.widget.EditText"))`)); }  
   get campoSenha() { return $(this.buildContextSelector(`UiSelector().resourceId("com.viavarejo.app.identificador:id/senhaLayout").childSelector(new UiSelector().className("android.widget.EditText"))`)); }
   get botaoEntrar() { return $(this.buildContextSelector(`UiSelector().className("android.widget.Button").text("Entrar")`)); }
   get modalCadastrarPosse() {return $(this.buildContextSelector(`UiSelector().resourceId("com.viavarejo.app.identificador:id/title")`)); }
   get botaoModalOk() { return $(this.buildContextSelector(`UiSelector().resourceId("com.viavarejo.app.identificador:id/btYes")`)); }

   
   name(screenName: string = "Login - App Posse"): string {
        return super.name(screenName);
    }

    async checkLoaded (element: Promise<WebdriverIO.Element> = this.logoPrincipal): Promise<void> {
        await super.checkLoaded(element);
    }

    async snapShot(screenName: string = this.name()): Promise<void> {
        await super.snapShot(screenName);
    }

    async logar(vendedor: {[key:string]:any}): Promise<void> {
        await this.enterScreen();
 
        const labelFilial =  await this.campoFilial
        await labelFilial.setValue(vendedor.filial);
        
        const labelEmpresaMatricula =  await this.campoEmpresaMatricula
        await labelEmpresaMatricula.click();
        await labelEmpresaMatricula.setValue(`${vendedor.empresa}${vendedor.matricula}`);
        
        const labelPassword =  await this.campoSenha
        await labelPassword.setValue(vendedor.senha);
        
        const labelEntrar =  await this.botaoEntrar
        await labelEntrar.click();
 
        this.leaveScreen();
     }

    async validarPosseNaoCadastrada(): Promise<void> {
        await this.enterScreen();

        const modalPosseNaoCadastrada = (await this.modalCadastrarPosse).isDisplayed();
        const botaoOk = await this.botaoModalOk
            await botaoOk.click(); 
    }
};
export default new AppPosse_LoginScreen();