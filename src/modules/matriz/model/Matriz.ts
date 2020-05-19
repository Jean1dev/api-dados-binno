import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, ID, Field } from "type-graphql";

@Entity('matriz')
@ObjectType()
export default class Matriz extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    @Field(() => ID)
    id: number

    @Column()
    @Field(() => String)
    nome: string

    @Column()
    @Field(() => String)
    cnpj: string

    @Column()
    @Field(() => String)
    telefone: string

    @Column()
    @Field(() => String)
    site: string

    @Column()
    @Field(() => String)
    contato: string

    @Column()
    @Field(() => String)
    identificador_sistema_origem: string
}