import { Resolver, Query, Arg, Mutation, FieldResolver, Root, Subscription, PubSub, Publisher } from "type-graphql";
import Rota from "../model/Rota";
import DefaultAppError from "../../../errors/DefaultAppError";
import RotaCreateInput from "./inputs/RotaCreateInput";
import RotaUpdateInput from "./inputs/RotaUpdateInput";
import Pessoa from "../../pessoa/model/Pessoa";

@Resolver(Rota)
export default class RotaResolver {

    @FieldResolver()
    public async criado_por(@Root() rota: Rota) {
        return Pessoa.findOne({ where: { id: rota.criado_por } })
    }

    @FieldResolver()
    public async enviado_para(@Root() rota: Rota) {
        return Pessoa.findOne({ where: { id: rota.enviado_para } })
    }

    @Query(() => [Rota])
    public async rotas(@Arg("limit") limit: number = 10, @Arg("offset") offset: number = 0) {
        return Rota.find({ take: limit, skip: offset })
    }

    @Query(() => Rota)
    public async rota(@Arg("id") id: number) {
        return Rota.findOne({ where: { id } })
    }

    @Mutation(() => Rota)
    public async saveRota(
        @Arg("data") data: RotaCreateInput,
        @PubSub('ROTA_ADD') publish: Publisher<Rota>) 
    {
        const rota = Rota.create(data)
        await rota.save()
        await publish(rota)
        return rota
    }

    @Mutation(() => Rota)
    public async updateRota(@Arg("data") data: RotaUpdateInput) {
        const rota = await Rota.findOne({ where: { id: data.id } })

        if (!rota) {
            throw new DefaultAppError('Rota nao existe')
        }

        Object.assign(rota, data)
        await rota.save()
        return rota
    }

    @Mutation(() => Boolean)
    public async deleteRota(@Arg("id") id: number) {
        return !!Rota.delete({ id })
    }

    @Subscription({ topics: 'ROTA_ADD' })
    rotaCriadaObserver(@Root() rota: Rota): Rota {
        return rota
    }
}