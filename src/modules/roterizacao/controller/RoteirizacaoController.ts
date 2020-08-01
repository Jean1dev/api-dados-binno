import {Body, Controller, OnUndefined, Post, UseBefore} from "routing-controllers";
import Roteirizacao from "../model/Roteirizacao";
import RoteirizacaoService from "../service/RoteirizacaoService";
import {container} from "tsyringe";
import expressAuthCheck from "../../../middlewares/expressAuthCheck";
import {IGeocoding} from "../model/Geocoding.model";

interface IWaypoint {
    longitude: number
    latitude: number
}

interface IPayload {
    waypoints: [IWaypoint]
    optimize: boolean
}

interface IFinalizarProcessamentoPayload {
    roteirizacaoId: number,
    data: IGeocoding
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
        await this.service.finalizarProcessamento(payload.data, payload.roteirizacaoId)
    }
}