import { ObjectType, Field } from "type-graphql";

@ObjectType()
export default class TotalVeiculosType {

    static build(totalRodando: number, totalParado: number): TotalVeiculosType {
        const self = new TotalVeiculosType()
        self.total_veiculos_rodando = totalRodando
        self.total_veiculos_parados = totalParado
        return self
    }

    @Field()
    total_veiculos_rodando: number

    @Field()
    total_veiculos_parados: number
}