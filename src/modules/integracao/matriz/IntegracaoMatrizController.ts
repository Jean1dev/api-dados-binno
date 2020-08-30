//https://www.npmjs.com/package/routing-controllers
import { Controller, Post, Req, Res, Get, OnUndefined } from "routing-controllers";
import { Request, Response } from 'express'
import IntegracaoMatrizService from './IntegracaoMatrizService'
import { getRepository } from "typeorm";
import Matriz from "../../matriz/model/Matriz";

@Controller()
export class IntegracaoMatrizController {

    private service: IntegracaoMatrizService

    constructor() {
        this.service = new IntegracaoMatrizService()
    }

    @Post('/integracao/inativar/matriz')
    @OnUndefined(204)
    public async inativarMatriz(@Req() req: Request) {
        const { id_binno, id_original } = req.body
        await this.service.inativarMatriz(id_binno, id_original)
    }

    @Post('/integracao/matriz')
    public async integrar(@Req() req: Request, @Res() res: Response): Promise<Response> {
        const { id, nome, contato } = req.body
        const matriz = await this.service.integrar({
            identificadorSistemaOrigem: id,
            nome,
            contato
        })
        return res.json(matriz)
    }

    @Get('/integracao')
    public async getAll() {
        return getRepository(Matriz).find()
    }
}
