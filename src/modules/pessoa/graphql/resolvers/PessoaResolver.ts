import {Resolver, Arg, Mutation, Query, FieldResolver, Root, Authorized, Ctx, Info} from "type-graphql";
import PessoaCreateInput from "../inputs/PessoaCreateInput";
import Pessoa from "../../model/Pessoa";
import PessoaUpdateInput from "../inputs/PessoaUpdateInput";
import Rota from "../../../rota/model/Rota";
import PessoaRepository from "../../repository/PessoaRepository";
import {container} from "tsyringe";
import Veiculo from "../../../veiculo/model/Veiculo";
import PessoaService from "../../service/PessoaService";
import FiltersExpression from "../../../../graphql/shared/FiltersExpression";
import PaginatedPessoa from "../types/PaginatedPessoa";

@Resolver(Pessoa)
export default class PessoaResolver {
    private repository: PessoaRepository
    private service: PessoaService

    constructor() {
        this.repository = container.resolve(PessoaRepository)
        this.service = container.resolve(PessoaService)
    }

    @FieldResolver()
    public async veiculos(@Root() pessoa: Pessoa) {
        return Veiculo.find({where: {pessoa_id: pessoa.id}})
    }

    @FieldResolver()
    public async rotas(@Root() pessoa: Pessoa) {
        return Rota.find({where: {criado_por: pessoa.id}})
    }

    //TODO: LINHA 37 WTF
    @Authorized()
    @Query(() => PaginatedPessoa)
    public async pessoasPaginated(
        @Info() teste: any,
        @Ctx() context: any,
        @Arg("limit", {defaultValue: 10}) limit: number,
        @Arg("offset", {defaultValue: 0}) offset: number,
        @Arg("filters", {defaultValue: {}}) filters: FiltersExpression) {
        return this.repository.findAllAndCount(limit, offset, filters, context.requestedFields.getFields(teste, {exclude: ['veiculos', 'rotas']}))
    }

    @Authorized()
    @Query(returns => [Pessoa])
    public async pessoas() {
        return this.repository.findAll()
    }

    @Query(() => Pessoa)
    public async pessoa(@Arg("id") id: number) {
        return this.repository.findOne({id})
    }

    @Authorized()
    @Mutation(() => Pessoa)
    public async savePessoa(@Arg("data", { validate: true }) data: PessoaCreateInput) {
        return this.service.salvar(data as Pessoa)
    }

    @Authorized()
    @Mutation(() => Pessoa)
    public async updatePessoa(@Arg("data") data: PessoaUpdateInput) {
        return this.repository.update(data as Pessoa)
    }
}