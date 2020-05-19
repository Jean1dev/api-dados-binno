import Veiculo from "../../model/Veiculo";
import { Resolver, Query, Arg, Mutation, FieldResolver, Root } from "type-graphql";
import DefaultAppError from "../../../../errors/DefaultAppError";
import VeiculoCreateInput from "../inputs/VeiculoCreateInput";
import VeiculoUpdateInput from "../inputs/VeiculoUpdateInput";
import Pessoa from "../../../pessoa/model/Pessoa";

@Resolver(Veiculo)
export default class VeiculoResolver {

    @FieldResolver()
    public async pessoa_id(@Root() veiculo: Veiculo) {
        return Pessoa.findOne({ where: { id: veiculo.pessoa_id }})
    }

    @Query(() => [Veiculo])
    public async veiculos(@Arg("limit") limit: number = 10, @Arg("offset") offset: number = 0) {
        return Veiculo.find({ take: limit, skip: offset })
    }

    @Query(() => Veiculo)
    public async veiculo(@Arg("id") id: number) {
        return Veiculo.findOne({ where: { id } })
    }

    @Mutation(() => Veiculo)
    public async saveVeiculo(@Arg("data") data: VeiculoCreateInput) {
        const veiculo = Veiculo.create(data)
        await veiculo.save()
        return veiculo
    }

    @Mutation(() => Veiculo)
    public async updateVeiculo(@Arg("data") data: VeiculoUpdateInput) {
        const veiculo = await Veiculo.findOne({ where: { id: data.id } })

        if (!veiculo) {
            throw new DefaultAppError('Veiculo nao existe')
        }

        Object.assign(veiculo, data)
        await veiculo.save()
        return veiculo
    }

    @Mutation(() => Boolean)
    public async deleteVeiculo(@Arg("id") id: number) {
        return !!Veiculo.delete({ id })
    }
}