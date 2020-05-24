import { Controller, Post, OnUndefined, Body } from "routing-controllers";
import IntegracaoUsuarioService from "./IntegracaoUsuarioService";

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
    @OnUndefined(204)
    public async integrar(@Body() {
        nome,
        login,
        senha,
        email,
        identificadorSistemaOrigem
    }: UsuarioIntegracaoPayload): Promise<void> {
        
        await this.service.integrar({
            nome,
            login,
            senha,
            email,
            identificadorSistemaOrigem
        })
    }
}