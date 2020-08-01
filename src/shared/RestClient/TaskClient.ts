import {singleton} from "tsyringe";
import configs from '../../config/env'
import axios, {AxiosResponse} from "axios";

interface ICriarRascunhoPayload {
    payload: any
    matrizId: number
    userId: number
    roteirizacaoId: number
}

@singleton()
export default class TaskClient {
    private BASE_URL = configs.TASK_API_URL

    public async creatTaskRoteirizar(payload: ICriarRascunhoPayload): Promise<AxiosResponse> {
        return axios.post(`${this.BASE_URL}/task`, payload)
    }
}