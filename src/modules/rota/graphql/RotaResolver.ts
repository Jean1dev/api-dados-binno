import {
    Resolver,
    Query,
    Arg,
    Mutation,
    FieldResolver,
    Root,
    Subscription,
    PubSub,
    Authorized,
    PubSubEngine,
} from "type-graphql";
import Rota from "../model/Rota";
import RotaUpdateInput from "./inputs/RotaUpdateInput";
import Pessoa from "../../pessoa/model/Pessoa";
import SituacaoRota from "../SituacaoRota.enum";
import RotaRepository from "../repository/RotaRepository";
import { container } from "tsyringe";
import RotaService from "../service/RotaService";
import PosicaoMotorista, { PosicaoMotoristaInput } from "./types/PosicaoMotorista";
import PaginatedRoute from "./types/PaginatedRoute";

@Resolver(Rota)
export default class RotaResolver {
    private repository: RotaRepository
    private service: RotaService

    constructor() {
        this.repository = container.resolve(RotaRepository)
        this.service = container.resolve(RotaService)
    }

    @FieldResolver()
    public async criado_por(@Root() rota: Rota) {
        return Pessoa.findOne({ where: { id: rota.criado_por } })
    }

    @FieldResolver()
    public async enviado_para(@Root() rota: Rota) {
        return Pessoa.findOne({ where: { id: rota.enviado_para } })
    }

    @FieldResolver()
    public geocodingURI(@Root() rota: Rota) {
        return rota.geocoding
    }

    @Authorized()
    @Query(() => PaginatedRoute)
    public async rotasPaginated(
        @Arg("limit", { defaultValue: 10 }) limit: number,
        @Arg("offset", { defaultValue: 0 }) offset: number,
        @Arg("situacao", type => SituacaoRota, { defaultValue: SituacaoRota.TODOS }) situacao: SituacaoRota) {
        let where = {}
        if (situacao != SituacaoRota.TODOS) {
            where = { situacao_rota: situacao }
        }
        return this.repository.findAllAndCount(limit, offset, where)
    }

    @Authorized()
    @Query(returns => [Rota])
    public async rotas() {
        return this.repository.findAll()
    }

    @Query(() => Rota)
    public async rota(@Arg("id") id: number) {
        return this.repository.findOne({ id })
    }

    @Authorized()
    @Query(() => [Rota])
    public async rotasParaOMotorista(
        @Arg("motorista_id") motorista_id: number,
        @Arg("situacao", type => SituacaoRota) situacao: SituacaoRota) {

        let filter: any = {
            enviado_para: motorista_id
        }

        if (situacao != SituacaoRota.TODOS) {
            filter.situacao_rota = situacao
        }
        return this.repository.find(undefined, undefined, filter);
    }

    @Authorized()
    @Mutation(() => Boolean)
    public async confirmarRota(
        @Arg("id") id: number,
        @PubSub() pubSub: PubSubEngine) {
        const rota = await this.service.confirmarRota(id)
        await pubSub.publish(`rota_confirmada_topic_${rota.id}`, rota);
        return true
    }

    @Mutation(() => Rota)
    public async updateRota(@Arg("data") data: RotaUpdateInput) {
        return this.service.atualizarRota(data as Rota)
    }

    @Mutation(() => Boolean)
    public async deleteRota(@Arg("id") id: number) {
        return this.repository.delete(id)
    }

    @Authorized()
    @Mutation(() => Boolean)
    public async atualizarPosicaoRota(
        @Arg('data') data: PosicaoMotoristaInput,
        @PubSub() pubSub: PubSubEngine) {

        await pubSub.publish(`andamento_rota_topic_${data.id_rota}`, data)
        return true
    }

    @Subscription({ topics: ({ args }) => args.topic })
    public andamentoDaRotaObserver(
        @Arg("topic") topic: string,
        @Root() data: PosicaoMotorista): PosicaoMotorista {
        return data
    }
}
