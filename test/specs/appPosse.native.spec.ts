import telaLogin from "../screenobjects/com.viavarejo.app.identificador/LoginScreen";
import telaAtribuirPosse from "../screenobjects/com.viavarejo.app.identificador/AtribuirPosseScreen";
import telaTermoAceite from "../screenobjects/com.viavarejo.app.identificador/TermoAceiteScreen";
import telaDadosPosse from "../screenobjects/com.viavarejo.app.identificador/DadosPosseScreen";
import { TestDataLoader } from "../../support/code/dataLoader";

describe("Funcionalidade: Permitir que o Gerente aplique a Posse do Aparelho ao Vendedor utilizando o App de Posse", () => {
  let dataHandler: TestDataLoader;

  before(async () => {
    dataHandler = new TestDataLoader(process.env.DEV_STAGE, ["vendedor.json","produto.json","cliente.json"]);
  });

  it("CMOB-T37 - Validar adição de posse de usuário", async () => {
    const gerenteTeste= dataHandler.assets.vendedor.gerente_cb
    const vendedorTeste = dataHandler.assets.vendedor.vendedor_cb;

    await telaLogin.logar(gerenteTeste);
    await telaAtribuirPosse.inserirDadosVendedor(vendedorTeste);
    await telaAtribuirPosse.selecionarContinuar();
    await telaDadosPosse.selecionarSair();

  });

  it("CMOB-T54 - Aceitar o termo de uso", async() => {
    const vendedorTeste = dataHandler.assets.vendedor.vendedor_cb;

    await telaLogin.logar(vendedorTeste);
    await telaTermoAceite.aceitarTermoPosse();
    await telaDadosPosse.validaMatriculaUsuarioPosse(vendedorTeste);
    await telaDadosPosse.selecionarSair();

  })

  it("CMOB-T215 - Validar adição de posse de usuário já com posse cadastrada em outro dispositivo", async () => {
    const gerenteTeste= dataHandler.assets.vendedor.gerente_cb
    const vendedorTeste = dataHandler.assets.vendedor.vendedor_cb;

    await telaLogin.logar(gerenteTeste);
    await telaAtribuirPosse.inserirDadosVendedor(vendedorTeste);
    await telaAtribuirPosse.selecionarContinuar();
    await telaAtribuirPosse.verificaPosseExistente();
    await telaDadosPosse.selecionarSair();
  });

  it("CMOB-T52 - Validar tentativa de login sem posse cadastrada", async() => {
    const vendedorTeste = dataHandler.assets.vendedor.vendedor_cb2;

    await telaLogin.logar(vendedorTeste);
    await telaLogin.validarPosseNaoCadastrada();

  });

  after(async () => {
    await driver.closeApp();
  });
  
});
