import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import Rota from "../../rota/model/Rota";

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

    @Column()
    @Field(() => String)
    tipo: string

    @Field(() => [ Rota ])
    rotas?: [ Rota ]
}