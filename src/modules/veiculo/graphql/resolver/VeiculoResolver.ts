import Veiculo from "../../model/Veiculo";
import { Resolver, Query, Arg, Mutation, FieldResolver, Root } from "type-graphql";
import DefaultAppError from "../../../../errors/DefaultAppError";
import VeiculoCreateInput from "../inputs/VeiculoCreateInput";
import VeiculoUpdateInput from "../inputs/VeiculoUpdateInput";
import Pessoa from "../../../pessoa/model/Pessoa";
import VeiculoRepository from "../../repository/VeiculoRepository";
import { container } from "tsyringe";

@Resolver(Veiculo)
export default class VeiculoResolver {
    private repository: VeiculoRepository

    constructor() {
        this.repository = container.resolve(VeiculoRepository)
    }

    @FieldResolver()
    public async pessoa_id(@Root() veiculo: Veiculo) {
        return Pessoa.findOne({ where: { id: veiculo.pessoa_id } })
    }

    @Query(() => [Veiculo])
    public async veiculos(
        @Arg("limit", { defaultValue: 10 }) limit: number,
        @Arg("offset", { defaultValue: 0 }) offset: number) {
        return this.repository.find(limit, offset)
    }

    @Query(() => Veiculo)
    public async veiculo(@Arg("id") id: number) {
        return this.repository.findOne({ id })
    }

    @Mutation(() => Veiculo)
    public async saveVeiculo(@Arg("data") data: VeiculoCreateInput) {
        return this.repository.save(data as Veiculo)
    }

    @Mutation(() => Veiculo)
    public async updateVeiculo(@Arg("data") data: VeiculoUpdateInput) {
        return this.repository.update(data as Veiculo)
    }

    @Mutation(() => Boolean)
    public async deleteVeiculo(@Arg("id") id: number) {
        return !!Veiculo.delete({ id })
    }
}