import { container, singleton } from "tsyringe";
import Roteirizacao from "../model/Roteirizacao";
import AuthenticationHolder from "../../../context/AuthenticationHolder";
import DefaultAppError from "../../../errors/DefaultAppError";
import SituacaoRota from "../../rota/SituacaoRota.enum";
import Rota from "../../rota/model/Rota";
import RotaRepository from "../../rota/repository/RotaRepository";
import RoteirizacaoRepository from "../repository/RoteirizacaoRepository";
import TaskClient from "../../../shared/RestClient/TaskClient";
import SituacaoProcessamento from "../SituacaoProcessamento.enum";
import UsuarioAcesso from "../../usuarioacesso/model/UsuarioAcesso";
import Pessoa from "../../pessoa/model/Pessoa";
import Utils from "../../../shared/utils/Utils";

interface IWaypoint {
    longitude: number
    latitude: number
}

interface IPayload {
    waypoints: [IWaypoint]
    optimize: boolean
    api: 'v1' | 'v2'
}

interface IDadosRota {
    roteirizacaoId: number
    motoristaId?: number | undefined
    situacao: SituacaoRota
    geojson: any
    cor?: string
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

    public async removerRoteirizacao(roteirizacaoId: number): Promise<boolean> {
        let rota = await this.repository.findOne({ id: roteirizacaoId })
        if (rota instanceof Roteirizacao) {
            const s3uri = rota.geocodingURI?.split('/')
            if (s3uri) {
                const s3key = s3uri[s3uri.length - 1]
                await this.tasksClient.removeS3File(s3key)
            }
            await this.repository.delete(roteirizacaoId)
            return true
        }
        return false
    }

    public async falhaNoProcessamento(roteirizacaoId: number): Promise<void> {
        let rota = await this.repository.findOne({ id: roteirizacaoId })
        if (rota instanceof Roteirizacao) {
            rota = new Roteirizacao.Builder()
                .buildFrom(rota)
                .situacao(SituacaoProcessamento.COM_FALHA)
                .build()

            await rota.save()
        }
    }

    public async finalizarProcessamento(roteirizacaoId: number, uri: string): Promise<void> {
        let rota = await this.repository.findOne({ id: roteirizacaoId })

        if (rota instanceof Roteirizacao) {
            rota = new Roteirizacao.Builder()
                .buildFrom(rota)
                .geocodingURI(uri)
                .situacao(SituacaoProcessamento.CONCLUIDO)
                .build()

            await rota.save()
        }
    }

    public async roteirizar(payload: IPayload): Promise<Roteirizacao> {
        try {
            const { userAccess, matriz_id } = this.authenticationHolder.getAuthenticationData()
            if (!userAccess || !matriz_id) {
                throw new DefaultAppError('userAccess ou matriz_id nao fornecidos')
            }

            const user = await UsuarioAcesso.findOne({ where: { id: userAccess } })
            const pessoa = await Pessoa.findOne({ where: { id: user?.pessoa } })

            const rota = await this.repository.save(new Roteirizacao.Builder()
                .matriz_id(matriz_id)
                //@ts-ignore
                .pessoa_id(pessoa.id)
                .cor(Utils.geraCor())
                .build())

            await this.tasksClient.creatTaskRoteirizar({
                roteirizacaoId: rota.id,
                matrizId: matriz_id,
                userId: userAccess,
                payload,
                api: payload.api || 'v1'
            })

            return rota
        } catch (e) {
            throw new DefaultAppError('Ocorreu um erro ao criar o rascunho', 400, e)
        }
    }

    public async criarRota(payload: IDadosRota): Promise<IRotaAndRascunho> {
        try {
            const roteirizacao = await this.repository.findOne({ where: { id: payload.roteirizacaoId } })

            if (!roteirizacao) {
                throw new DefaultAppError('Roteirizacao inexistente')
            }

            const rota = await this.rotaRepository.save(new Rota.Builder()
                .criado_por(roteirizacao.pessoa_id)
                .enviado_para(payload.motoristaId)
                .situacao_rota(payload.situacao)
                .geocoding(payload.geojson)
                .nome(roteirizacao.descricao || '')
                .cor(payload.cor || Utils.geraCor())
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