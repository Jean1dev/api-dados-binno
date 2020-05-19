import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";
import Pessoa from "../../pessoa/model/Pessoa";

@Entity('rota')
@ObjectType()
export default class Rota extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    @Field(() => ID)
    id: number

    @Column()
    @Field(() => String)
    rota_calculada: string

    @Column()
    @Field(() => Boolean)
    confimada: boolean

    @Column()
    @Field(() => String)
    observacoes: string

    @Column()
    @Field(() => Boolean)
    finalizada: boolean

    @Column()
    @Field(() => Pessoa)
    criado_por:number

    @Column()
    @Field(() => Pessoa)
    enviado_para:number
}