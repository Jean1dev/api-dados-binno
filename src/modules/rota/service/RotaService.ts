import { singleton, container } from "tsyringe";
import GeolocalizacaoClient from "../../../shared/RestClient/GeolocalizacaoClient";

@singleton()
export default class RotaService {

    private geolocalizacaoClient: GeolocalizacaoClient

    constructor() {
        this.geolocalizacaoClient = container.resolve(GeolocalizacaoClient)
    }

    public async consultarRotaCalculada(idRota: string): Promise<string> {
        const { data } = await this.geolocalizacaoClient.consultarRotaCalculada(idRota)
        return JSON.stringify(data)
    }
}