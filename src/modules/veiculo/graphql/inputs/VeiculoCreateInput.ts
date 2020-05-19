import { InputType, Field, Int } from "type-graphql";

@InputType()
export default class VeiculoCreateInput {

    @Field()
    placa: string

    @Field({ nullable: true })
    capacidade_carga?: string

    @Field({ nullable: true })
    consumo_medio?: string

    @Field({ nullable: true })
    tipo_combustivel?: string

    @Field({ nullable: true })
    num_max_paradas?: number

    @Field({ nullable: true })
    tempo_max_horas?: string

    @Field({ nullable: true })
    distancia_max?: number

    @Field({ nullable: true })
    tipo_viagem?: string

    @Field(() => Int)
    pessoa_id: number
}