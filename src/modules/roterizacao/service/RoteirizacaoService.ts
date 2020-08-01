import {container, singleton} from "tsyringe";
import Roteirizacao from "../model/Roteirizacao";
import AuthenticationHolder from "../../../context/AuthenticationHolder";
import DefaultAppError from "../../../errors/DefaultAppError";
import SituacaoRota from "../../rota/SituacaoRota.enum";
import Rota from "../../rota/model/Rota";
import RotaRepository from "../../rota/repository/RotaRepository";
import RoteirizacaoRepository from "../repository/RoteirizacaoRepository";
import TaskClient from "../../../shared/RestClient/TaskClient";
import {IGeocoding} from "../model/Geocoding.model";
import SituacaoProcessamento from "../SituacaoProcessamento.enum";

interface IWaypoint {
    longitude: number
    latitude: number
}

interface IPayload {
    waypoints: [IWaypoint]
    optimize: boolean
}

interface IDadosRota {
    roteirizacaoId: number
    motoristaId?: number | undefined
    situacao: SituacaoRota
    geojson: any
}

interface IRotaAndRascunho {
    rota: Rota
    roteirizacao: Roteirizacao
}

@singleton()
export default class RoteirizacaoService {

    private tasksClient: TaskClient
    private authenticationHolder: AuthenticationHolder
    private rotaRepository: RotaRepository
    private repository: RoteirizacaoRepository

    constructor() {
        this.tasksClient = container.resolve(TaskClient)
        this.authenticationHolder = container.resolve(AuthenticationHolder)
        this.rotaRepository = container.resolve(RotaRepository)
        this.repository = container.resolve(RoteirizacaoRepository)
    }

    public async finalizarProcessamento(data: IGeocoding, roteirizacaoId: number): Promise<void> {
        let rota = await this.repository.findOne({ id: roteirizacaoId })

        if (rota instanceof Roteirizacao) {
            rota = new Roteirizacao.Builder()
                .buildFrom(rota)
                .geocoding(data)
                .situacao(SituacaoProcessamento.CONCLUIDO)
                .build()

            await rota.save()
        }
    }

    public async roteirizar(payload: IPayload): Promise<Roteirizacao> {
        try {
            const {userAccess, matriz_id} = this.authenticationHolder.getAuthenticationData()
            if (!userAccess || !matriz_id) {
                throw new DefaultAppError('userAccess ou matriz_id nao fornecidos')
            }

            const rota = await this.repository.save(new Roteirizacao.Builder()
                .matriz_id(matriz_id)
                .pessoa_id(userAccess)
                .geocoding({} as IGeocoding)
                .build())

            await this.tasksClient.creatTaskRoteirizar({
                roteirizacaoId: rota.id,
                matrizId: matriz_id,
                userId: userAccess,
                payload
            })

            return rota
        } catch (e) {
            throw new DefaultAppError('Ocorreu um erro ao criar o rascunho', 400, e)
        }
    }

    public async criarRota(payload: IDadosRota): Promise<IRotaAndRascunho> {
        try {
            const roteirizacao = await this.repository.findOne({where: {id: payload.roteirizacaoId}})

            if (!roteirizacao) {
                throw new DefaultAppError('Roteirizacao inexistente')
            }

            const rota = await this.rotaRepository.save(new Rota.Builder()
                .criado_por(roteirizacao.pessoa_id)
                .enviado_para(payload.motoristaId)
                .situacao_rota(payload.situacao)
                .geocoding(payload.geojson)
                .nome(roteirizacao.descricao || '')
                .build())

            return {
                rota,
                roteirizacao
            }
        } catch (e) {
            throw new DefaultAppError('Ocorreu um erro ao criar o rota', 400, e)
        }
    }
}