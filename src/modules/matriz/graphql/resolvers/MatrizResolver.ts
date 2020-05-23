import { Resolver, Arg, Query } from "type-graphql";
import Matriz from "../../model/Matriz";
import MatrizRepository from "../../repository/MatrizRepository";
import { container } from "tsyringe";

@Resolver()
export default class MatrizResolver {
    private repository: MatrizRepository

    constructor() {
        this.repository = container.resolve(MatrizRepository)
    }

    @Query(() => Matriz)
    public async matriz(@Arg("id") id: number) {
        return this.repository.findOne({ id })
    }

    @Query(() => [Matriz])
    public async matrizes(
        @Arg("limit", { defaultValue: 10 }) limit: number,
        @Arg("offset", { defaultValue: 0 }) offset: number) {
        return this.repository.find(limit, offset)
    }
}