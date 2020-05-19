import { Resolver, Arg, Query } from "type-graphql";
import Matriz from "../../model/Matriz";

@Resolver()
export default class MatrizResolver {

    @Query(() => Matriz)
    public async matriz(@Arg("id") id: number ) {
        return Matriz.findOne({ where: { id } })
    }

    @Query(() => [ Matriz ])
    public async matrizes(@Arg("limit") limit: number = 10, @Arg("offset") offset: number = 0) {
            return Matriz.find({ take: limit, skip: offset })
    }
}