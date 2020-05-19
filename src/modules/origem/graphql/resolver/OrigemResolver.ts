import { Resolver, Query, Arg, Mutation } from "type-graphql";
import DefaultAppError from "../../../../errors/DefaultAppError";
import Origem from "../../model/Origem";
import OrigemCreateInput from "../inputs/OrigemCreateInput";
import OrigemUpdateInput from "../inputs/OrigemUpdateInput";

@Resolver()
export default class OrigemResolver {

    @Query(() => [Origem])
    public async origens(@Arg("limit") limit: number = 10, @Arg("offset") offset: number = 0) {
        return Origem.find({ take: limit, skip: offset })
    }

    @Query(() => Origem)
    public async origem(@Arg("id") id: number) {
        return Origem.findOne({ where: { id } })
    }

    @Mutation(() => Origem)
    public async saveOrigem(@Arg("data") data: OrigemCreateInput) {
        const origem = Origem.create(data)
        await origem.save()
        return origem
    }

    @Mutation(() => Origem)
    public async updateOrigem(@Arg("data") data: OrigemUpdateInput) {
        const origem = await Origem.findOne({ where: { id: data.id } })

        if (!origem) {
            throw new DefaultAppError('Origem nao existe')
        }

        Object.assign(origem, data)
        await origem.save()
        return origem
    }

}