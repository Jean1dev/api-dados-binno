import { BaseEntity, PrimaryGeneratedColumn, Entity, Column } from "typeorm";
import { Field, ID, ObjectType, Int } from "type-graphql";
import Pessoa from "../../pessoa/model/Pessoa";

@Entity('veiculo')
@ObjectType()
export default class Veiculo extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    @Field(() => ID)
    id: number

    @Column()
    @Field(() => String)
    placa: string

    @Column()
    @Field(() => String)
    capacidade_carga: string

    @Column()
    @Field(() => String)
    consumo_medio: string

    @Column()
    @Field(() => String)
    tipo_combustivel: string

    @Column()
    @Field(() => Int)
    num_max_paradas: number

    @Column()
    @Field(() => String)
    tempo_max_horas: string

    @Column()
    @Field(() => Number)
    distancia_max: number

    @Column()
    @Field(() => String)
    tipo_viagem: string

    @Column()
    @Field(() => Pessoa)
    pessoa_id: number
}