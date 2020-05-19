import { InputType, Field } from "type-graphql";

@InputType()
export default class OrigemCreateInput {
    @Field()
    nome: string

    @Field()
    cep: string

    @Field()
    bairro: string

    @Field({ nullable: true })
    complemento?: string

    @Field()
    municipio: string

    @Field()
    estado: string

    @Field()
    pais: string

    @Field()
    logradouro: string

    @Field({ nullable: true })
    numero?: string

    @Field({ nullable: true })
    horario_operacao?: string
}