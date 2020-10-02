import {singleton} from "tsyringe";
import configs from '../../config/env'
import axios, {AxiosResponse} from "axios";

interface ICriarRascunhoPayload {
    payload: any
    matrizId: number
    userId: number
    roteirizacaoId: number
    api: 'v1' | 'v2'
}

@singleton()
export default class TaskClient {
    private BASE_URL = configs.TASK_API_URL
    private DEFAULT_TIMEOUT = 20000

    public async creatTaskRoteirizar(payload: ICriarRascunhoPayload): Promise<AxiosResponse> {
        return axios.post(`${this.BASE_URL}/task`, payload, { timeout: this.DEFAULT_TIMEOUT })
    }

    public async removeS3File(fileS3Key: string): Promise<AxiosResponse> {
        return axios.post(`${this.BASE_URL}/remove-s3-file`, {
            key: fileS3Key
        }, { timeout: this.DEFAULT_TIMEOUT })
    }
}