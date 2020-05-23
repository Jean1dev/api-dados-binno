import { Resolver, Query } from "type-graphql";
import TotalVeiculosType from "../types/TotalVeiculosType";
import VeiculoRepository from "../../repository/VeiculoRepository";
import { container } from "tsyringe";

@Resolver(TotalVeiculosType)
export default class TotalVeiculosResolver {
    private repository: VeiculoRepository

    constructor() {
        this.repository = container.resolve(VeiculoRepository)
    }

    @Query(() => TotalVeiculosType)
    public async getTotalVeiculosType() {
        const totalRodando = await this.repository.getTotalVeiculosRodados()
        const totalParado = await this.repository.getTotalVeiculosParados()
        return TotalVeiculosType.build(totalRodando, totalParado)
    }
}