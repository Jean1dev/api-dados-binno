import {Body, Controller, OnUndefined, Post, UseBefore} from "routing-controllers";
import Roteirizacao from "../model/Roteirizacao";
import RoteirizacaoService from "../service/RoteirizacaoService";
import {container} from "tsyringe";
import expressAuthCheck from "../../../middlewares/expressAuthCheck";
import TipoRota from "../../rota/TipoRota.enum";

interface IWaypoint {
    longitude: number
    latitude: number
}

interface IPayload {
    waypoints: [IWaypoint]
    optimize: boolean
    api: 'v1' | 'v2'
    tipo: TipoRota
}

interface IFinalizarProcessamentoPayload {
    roteirizacaoId: number,
    uri: string
}

@Controller('/roteirizacao')
export default class RoteirizacaoController {

    private service: RoteirizacaoService

    constructor() {
        this.service = container.resolve(RoteirizacaoService)
    }

    @Post('/executar')
    @UseBefore(expressAuthCheck)
    public async criarRascunho(@Body() payload: IPayload): Promise<Roteirizacao> {
        return this.service.roteirizar(payload)
    }

    @Post('/processamento')
    @OnUndefined(204)
    public async finalizarProcessamento(@Body() payload: IFinalizarProcessamentoPayload) {
        await this.service.finalizarProcessamento(payload.roteirizacaoId, payload.uri)
    }

    @Post('/falha')
    @OnUndefined(204)
    public async falhaNoProcessamento(@Body() payload: IFinalizarProcessamentoPayload) {
        await this.service.falhaNoProcessamento(payload.roteirizacaoId)
    }

    @Post('/clean-roteirizacao')
    @OnUndefined(204)
    public async limparRoteirizacao() {
        await this.service.encontrarERemoverRoteirizacaoSemRotas()
    }
}