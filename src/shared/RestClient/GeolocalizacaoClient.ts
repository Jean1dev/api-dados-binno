import axios, { AxiosResponse } from 'axios'
import { singleton } from "tsyringe"
import configs from '../../config/env'

interface IWaypoint {
    longitude: number
    latitude: number
}

interface ICriarRascunhoPayload {
    waypoints: [IWaypoint]
    optimize: boolean
}

@singleton()
export default class GeolocalizacaoClient {
    private BASE_URL = configs.GEOLOCALIZACAO_API_URL

    public async consultarRotaCalculada(idRota: string): Promise<AxiosResponse> {
        return axios.get(`${this.BASE_URL}/rota/${idRota}`)
    }

    public async roteirizar(payload: ICriarRascunhoPayload): Promise<AxiosResponse> {
        return axios.post(`${this.BASE_URL}/criar-rota`, payload)
    }
}