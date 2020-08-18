import { Controller, Post, Body } from "routing-controllers";
import IntegracaoUsuarioService from "./IntegracaoUsuarioService";
import UsuarioAcesso from "../../usuarioacesso/model/UsuarioAcesso";

interface UsuarioIntegracaoPayload {
    nome: string
    login: string
    senha: string
    email: string
    identificadorSistemaOrigem: string
}

@Controller()
export class IntegracaoUsuarioController {
    private service: IntegracaoUsuarioService;

    constructor() {
        this.service = new IntegracaoUsuarioService()
    }

    @Post('/integracao/usuario-acesso')
    public async integrar(@Body() {
        nome,
        login,
        senha,
        email,
        identificadorSistemaOrigem
    }: UsuarioIntegracaoPayload): Promise<UsuarioAcesso> {
        
        return this.service.integrar({
            nome,
            login,
            senha,
            email,
            identificadorSistemaOrigem
        })
    }
}