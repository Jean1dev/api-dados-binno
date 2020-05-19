import { InputType, Field, ID } from "type-graphql";

@InputType()
export default class OrigemUpdateInput {

    @Field(() => ID)
    id: number

    @Field({ nullable: true })
    nome?: string

    @Field({ nullable: true })
    cep?: string

    @Field({ nullable: true })
    bairro?: string

    @Field({ nullable: true })
    complemento?: string

    @Field({ nullable: true })
    municipio?: string

    @Field({ nullable: true })
    estado?: string

    @Field({ nullable: true })
    pais?: string

    @Field({ nullable: true })
    logradouro?: string

    @Field({ nullable: true })
    numero?: string

    @Field({ nullable: true })
    horario_operacao?: string
}