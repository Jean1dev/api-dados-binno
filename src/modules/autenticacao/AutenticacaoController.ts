import { Controller, Post, Body } from "routing-controllers";
import AutenticacaoService from "./AutenticacaoService";

interface autenticacaoPayload {
    login: string
    password: string
}

@Controller()
export class AutenticacaoController {

    private service: AutenticacaoService

    constructor() {
        this.service = new AutenticacaoService()
    }

    @Post('/autenticar')
    public async autenticar(@Body() { login, password }: autenticacaoPayload): Promise<object> {
        return await this.service.autenticar({ login, password })
    }
}