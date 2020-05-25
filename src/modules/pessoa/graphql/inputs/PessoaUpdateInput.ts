import { InputType, Field, Int } from "type-graphql"
import TipoPessoa from "../../TipoPessoa.num"

@InputType()
export default class PessoaUpdateInput {

    @Field(type => Int)
    id: number

    @Field({ nullable: true })
    primeiro_nome?: string

    @Field({ nullable: true })
    ultimo_nome?: string

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
    email?: string

    @Field({ nullable: true })
    observacao?: string

    @Field({ nullable: true })
    rg?: string

    @Field({ nullable: true })
    cnh?: string

    @Field({ nullable: true })
    cpf?: string

    @Field(type => TipoPessoa, { nullable: true })
    tipo: TipoPessoa
}