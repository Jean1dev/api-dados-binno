import { Resolver, Arg, Mutation, Query, FieldResolver, Root } from "type-graphql";
import PessoaCreateInput from "../inputs/PessoaCreateInput";
import Pessoa from "../../model/Pessoa";
import PessoaUpdateInput from "../inputs/PessoaUpdateInput";
import DefaultAppError from "../../../../errors/DefaultAppError";
import Rota from "../../../rota/model/Rota";

@Resolver(Pessoa)
export default class PessoaResolver {

    @FieldResolver()
    public async rotas(@Root() pessoa:Pessoa) {
        return Rota.find({ where: { criado_por: pessoa.id }})
    }

    @Query(() => [Pessoa])
    public async pessoas(@Arg("limit") limit: number = 10, @Arg("offset") offset: number = 0) {
        return Pessoa.find({ take: limit, skip: offset })
    }

    @Query(() => Pessoa)
    public async pessoa(@Arg("id") id: number) {
        return Pessoa.findOne({ where: { id } })
    }

    @Mutation(() => Pessoa)
    public async savePessoa(@Arg("data") data: PessoaCreateInput) {
        const pessoa = Pessoa.create(data)
        await pessoa.save()
        return pessoa
    }

    @Mutation(() => Pessoa)
    public async updatePessoa(@Arg("data") data: PessoaUpdateInput) {
        const pessoa = await Pessoa.findOne({ where: { id: data.id } })

        if (!pessoa) {
            throw new DefaultAppError('Usuario nao existe')
        }

        Object.assign(pessoa, data)
        await pessoa.save()
        return pessoa
    }
}