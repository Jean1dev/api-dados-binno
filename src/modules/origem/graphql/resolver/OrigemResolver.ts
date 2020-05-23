import { Resolver, Query, Arg, Mutation } from "type-graphql";
import DefaultAppError from "../../../../errors/DefaultAppError";
import Origem from "../../model/Origem";
import OrigemCreateInput from "../inputs/OrigemCreateInput";
import OrigemUpdateInput from "../inputs/OrigemUpdateInput";
import OrigemRepository from "../../repository/OrigemRepository";
import { container } from "tsyringe";

@Resolver()
export default class OrigemResolver {
    private repository: OrigemRepository

    constructor() {
        this.repository = container.resolve(OrigemRepository)
    }

    @Query(() => [Origem])
    public async origens(
        @Arg("limit", { defaultValue: 10 }) limit: number, 
        @Arg("offset", { defaultValue: 0 }) offset: number) {
        return this.repository.find(limit, offset)
    }

    @Query(() => Origem)
    public async origem(@Arg("id") id: number) {
        return this.repository.findOne({ id })
    }

    @Mutation(() => Origem)
    public async saveOrigem(@Arg("data") data: OrigemCreateInput) {
        return this.repository.save(data as Origem)
    }

    @Mutation(() => Origem)
    public async updateOrigem(@Arg("data") data: OrigemUpdateInput) {
        return this.repository.update(data as Origem)
    }

}