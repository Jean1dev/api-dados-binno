import { InputType, Field } from "type-graphql";
import TipoPessoa from "../../TipoPessoa.num";

@InputType()
export default class PessoaCreateInput {

    @Field()
    primeiro_nome: string

    @Field()
    ultimo_nome: string

    @Field()
    email: string

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
    observacao?: string

    @Field()
    rg: string

    @Field({ nullable: true })
    cnh?: string

    @Field({ nullable: true })
    cpf?: string

    @Field(type => TipoPessoa, { defaultValue: TipoPessoa.ADMINISTRADOR })
    tipo: TipoPessoa

}