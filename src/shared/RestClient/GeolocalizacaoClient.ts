import axios, { AxiosResponse } from 'axios'
import { singleton } from "tsyringe"
import configs from '../../config/env'

@singleton()
export default class GeolocalizacaoClient {
    private BASE_URL = configs.GEOLOCALIZACAO_API_URL

    public async consultarRotaCalculada(idRota: string): Promise<AxiosResponse> {
        return axios.get(`${this.BASE_URL}/rota/${idRota}`)
    }
}