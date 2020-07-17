import {Body, Controller, Post, UseBefore} from "routing-controllers";
import Roteirizacao from "../model/Roteirizacao";
import RoteirizacaoService from "../service/RoteirizacaoService";
import {container} from "tsyringe";
import expressAuthCheck from "../../../middlewares/expressAuthCheck";

interface IWaypoint {
    longitude: number
    latitude: number
}

interface IPayload {
    waypoints: [IWaypoint]
    optimize: boolean
}

@Controller('/roteirizacao')
@UseBefore(expressAuthCheck)
export default class RoteirizacaoController {

    private service: RoteirizacaoService

    constructor() {
        this.service = container.resolve(RoteirizacaoService)
    }

    @Post('/executar')
    public async criarRascunho(@Body() payload: IPayload): Promise<Roteirizacao> {
        return this.service.roteirizar(payload)
    }
}