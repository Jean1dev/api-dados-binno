import { Resolver, Arg, Mutation, Query, FieldResolver, Root } from "type-graphql";
import PessoaCreateInput from "../inputs/PessoaCreateInput";
import Pessoa from "../../model/Pessoa";
import PessoaUpdateInput from "../inputs/PessoaUpdateInput";
import DefaultAppError from "../../../../errors/DefaultAppError";
import Rota from "../../../rota/model/Rota";
import PessoaRepository from "../../repository/PessoaRepository";
import { container } from "tsyringe";
import Veiculo from "../../../veiculo/model/Veiculo";

@Resolver(Pessoa)
export default class PessoaResolver {
    private repository: PessoaRepository

    constructor() {
        this.repository = container.resolve(PessoaRepository)
    }

    @FieldResolver()
    public async veiculos(@Root() pessoa: Pessoa) {
        return Veiculo.find({ where: { pessoa_id: pessoa.id }})
    }
    
    @FieldResolver()
    public async rotas(@Root() pessoa:Pessoa) {
        return Rota.find({ where: { criado_por: pessoa.id }})
    }

    @Query(() => [Pessoa])
    public async pessoas(
        @Arg("limit", { defaultValue: 10 }) limit: number, 
        @Arg("offset", { defaultValue: 0}) offset: number) {
        return this.repository.find(limit, offset)
    }

    @Query(() => Pessoa)
    public async pessoa(@Arg("id") id: number) {
        return this.repository.findOne({ id })
    }

    @Mutation(() => Pessoa)
    public async savePessoa(@Arg("data") data: PessoaCreateInput) {
        return this.repository.save(data as Pessoa)
    }

    @Mutation(() => Pessoa)
    public async updatePessoa(@Arg("data") data: PessoaUpdateInput) {
        return this.repository.update(data as Pessoa)
    }
}