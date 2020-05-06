import { Controller, Post, Req, Res } from "routing-controllers";
import { Request, Response } from "express";
import IntegracaoUsuarioService from "./IntegracaoUsuarioService";

@Controller()
export class IntegracaoUsuarioController {
    private service: IntegracaoUsuarioService;

    constructor() {
        this.service = new IntegracaoUsuarioService()
    }

    @Post('/integracao/usuario-acesso')
    public async integrar(@Req() req: Request,@Res() res: Response ): Promise<Response> {
        const { usuario } = req.body
        const {
            nome,
            login,
            senha,
            tipo,
            pertenceAQualCliente: identificadorSistemaOrigem
        } = usuario
        
        await this.service.integrar({
            nome,
            login,
            senha,
            tipo,
            identificadorSistemaOrigem
        })

        return res.json()
    }
}