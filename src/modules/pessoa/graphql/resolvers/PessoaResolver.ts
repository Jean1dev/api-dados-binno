import { Resolver, Arg, Mutation, Query, FieldResolver, Root, Authorized } from "type-graphql";
import PessoaCreateInput from "../inputs/PessoaCreateInput";
import Pessoa from "../../model/Pessoa";
import PessoaUpdateInput from "../inputs/PessoaUpdateInput";
import Rota from "../../../rota/model/Rota";
import PessoaRepository from "../../repository/PessoaRepository";
import { container } from "tsyringe";
import Veiculo from "../../../veiculo/model/Veiculo";
import PessoaService from "../../service/PessoaService";
import FiltersExpression from "../../../../graphql/shared/FiltersExpression";

@Resolver(Pessoa)
export default class PessoaResolver {
    private repository: PessoaRepository
    private service : PessoaService

    constructor() {
        this.repository = container.resolve(PessoaRepository)
        this.service = container.resolve(PessoaService)
    }

    @FieldResolver()
    public async veiculos(@Root() pessoa: Pessoa) {
        return Veiculo.find({ where: { pessoa_id: pessoa.id }})
    }
    
    @FieldResolver()
    public async rotas(@Root() pessoa:Pessoa) {
        return Rota.find({ where: { criado_por: pessoa.id }})
    }

    @Authorized()
    @Query(() => [Pessoa])
    public async pessoas(
        @Arg("limit", { defaultValue: 10 }) limit: number, 
        @Arg("offset", { defaultValue: 0}) offset: number,
        @Arg("filters", { defaultValue: null }) filters: FiltersExpression) {
        return this.repository.find(limit, offset, filters)
    }

    @Query(() => Pessoa)
    public async pessoa(@Arg("id") id: number) {
        return this.repository.findOne({ id })
    }

    @Authorized()
    @Mutation(() => Pessoa)
    public async savePessoa(@Arg("data") data: PessoaCreateInput) {
        return this.service.salvar(data as Pessoa)
    }

    @Authorized()
    @Mutation(() => Pessoa)
    public async updatePessoa(@Arg("data") data: PessoaUpdateInput) {
        return this.repository.update(data as Pessoa)
    }

    @Authorized()
    @Mutation(() => Boolean)
    public async criarUsuarioAcesso(@Arg("id") pessoaId: number) {
        return this.service.criarUsuarioAcesso(pessoaId)
    }
}