import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity('origem')
@ObjectType()
export default class Origem extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    @Field(() => ID)
    id: number

    @Column()
    @Field(() => String)
    nome: string

    @Column()
    @Field(() => String)
    cep: string

    @Column()
    @Field(() => String)
    bairro: string

    @Column()
    @Field(() => String, { nullable: true })
    complemento?: string

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
    horario_operacao: string
}