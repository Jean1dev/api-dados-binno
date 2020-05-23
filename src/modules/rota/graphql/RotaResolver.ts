import {
    Resolver,
    Query,
    Arg,
    Mutation,
    FieldResolver,
    Root,
    Subscription,
    PubSub,
    Publisher,
} from "type-graphql";
import Rota from "../model/Rota";
import RotaCreateInput from "./inputs/RotaCreateInput";
import RotaUpdateInput from "./inputs/RotaUpdateInput";
import Pessoa from "../../pessoa/model/Pessoa";
import SituacaoRota from "../SituacaoRota.enum";
import RotaRepository from "../repository/RotaRepository";
import { container } from "tsyringe";

@Resolver(Rota)
export default class RotaResolver {
    private repository: RotaRepository

    constructor() {
        this.repository = container.resolve(RotaRepository)
    }

    @FieldResolver()
    public async criado_por(@Root() rota: Rota) {
        return Pessoa.findOne({ where: { id: rota.criado_por } })
    }

    @FieldResolver()
    public async enviado_para(@Root() rota: Rota) {
        return Pessoa.findOne({ where: { id: rota.enviado_para } })
    }

    @Query(() => [Rota])
    public async rotas(
        @Arg("limit", { defaultValue: 10 }) limit: number,
        @Arg("offset", { defaultValue: 0 }) offset: number,
        @Arg("situacao", type => SituacaoRota, { defaultValue: SituacaoRota.TODOS }) situacao: SituacaoRota) {
        let where = {}
        if (situacao != SituacaoRota.TODOS) {
            where = { situacao_rota: situacao }
        }
        return this.repository.find(limit, offset, where)
    }

    @Query(() => Rota)
    public async rota(@Arg("id") id: number) {
        return this.repository.findOne({ id })
    }

    @Mutation(() => Rota)
    public async saveRota(
        @Arg("data") data: RotaCreateInput,
        @PubSub('ROTA_ADD') publish: Publisher<Rota>) {
        const rota = await this.repository.save(data as Rota)
        await publish(rota)
        return rota
    }

    @Mutation(() => Rota)
    public async updateRota(@Arg("data") data: RotaUpdateInput) {
        return this.repository.update(data as Rota)
    }

    @Mutation(() => Boolean)
    public async deleteRota(@Arg("id") id: number) {
        return this.repository.delete(id)
    }

    @Subscription({ topics: 'ROTA_ADD' })
    rotaCriadaObserver(@Root() rota: Rota): Rota {
        return rota
    }
}