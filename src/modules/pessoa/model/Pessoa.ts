import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import Rota from "../../rota/model/Rota";
import Veiculo from "../../veiculo/model/Veiculo";
import TipoPessoa from "../TipoPessoa.num";
import Builder from "../../../shared/Builder";

@Entity('pessoa')
@ObjectType()
export default class Pessoa extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    @Field(() => String)
    primeiro_nome: string

    @Column()
    @Field(() => String)
    ultimo_nome: string

    @Column()
    @Field(() => String)
    cep: string

    @Column()
    @Field(() => String)
    bairro: string

    @Column()
    @Field(() => String)
    complemento: string

    @Column()
    @Field(() => String)
    municipio: string

    @Column()
    @Field(() => String)
    estado: string

    @Column()
    @Field(() => String)
    pais: string

    @Column()
    @Field(() => String)
    logradouro: string

    @Column()
    @Field(() => String)
    numero: string

    @Column()
    @Field(() => String)
    email: string

    @Column()
    @Field(() => String)
    observacao: string

    @Column()
    @Field(() => String)
    rg: string

    @Column()
    @Field(() => String)
    cnh: string

    @Column()
    @Field(() => String)
    cpf: string

    @Column('int')
    @Field(type => TipoPessoa)
    tipo: TipoPessoa

    @Field(() => [Rota])
    rotas?: [Rota]

    @Field(() => [Veiculo])
    veiculos?: [Veiculo]

    static Builder = class PessoaBuilder extends Builder<Pessoa> {

        constructor() { super(new Pessoa()) }

        primeiro_nome(nome: string): this {
            this.entity.primeiro_nome = nome
            return this
        }

        ultimo_nome(ultimo_nome: string): this {
            this.entity.ultimo_nome = ultimo_nome
            return this
        }

        cep(cep: string): this {
            this.entity.cep = cep
            return this
        }

        bairro(bairro: string): this {
            this.entity.bairro = bairro
            return this
        }

        complemento(complemento: string): this {
            this.entity.complemento = complemento
            return this
        }

        municipio(municipio: string): this {
            this.entity.municipio = municipio
            return this
        }

        estado(estado: string): this {
            this.entity.estado = estado
            return this
        }

        pais(pais: string): this {
            this.entity.pais = pais
            return this
        }

        logradouro(logradouro: string): this {
            this.entity.logradouro = logradouro
            return this
        }

        numero(numero: string): this {
            this.entity.numero = numero 
            return this
        }

        email(email: string): this {
            this.entity.email = email
            return this
        }

        observacao(observacao: string): this {
            this.entity.observacao = observacao
            return this
        }

        rg(rg: string): this {
            this.entity.rg = rg
            return this
        }

        cnh(cnh: string): this {
            this.entity.cnh = cnh
            return this
        }

        cpf(cpf: string): this {
            this.entity.cpf = cpf
            return this
        }

        tipo(tipo: TipoPessoa): this {
            this.entity.tipo = tipo
            return this
        }
    }
}