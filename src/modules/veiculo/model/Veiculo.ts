import { BaseEntity, PrimaryGeneratedColumn, Entity, Column } from "typeorm";
import { Field, ID, ObjectType, Int } from "type-graphql";
import Pessoa from "../../pessoa/model/Pessoa";
import Builder from "../../../shared/Builder";

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

    @Column()
    veiculo_esta_sendo_utilizado_no_momento: boolean

    @Column()
    matriz_id: number

    static Builder = class VeiculoBuilder extends Builder<Veiculo> {
        constructor() { super(new Veiculo()) }

        matriz_id(matriz_id: number): this {
            this.entity.matriz_id = matriz_id
            return this
        }

        placa(placa: string): this {
            this.entity.placa = placa
            return this
        }

        capacidadeCarga(capacidade_carga: string): this {
            this.entity.capacidade_carga = capacidade_carga
            return this
        }

        consumoMedio(consumo_medio: string): this {
            this.entity.consumo_medio = consumo_medio
            return this
        }

        tipoCombustivel(tipo_combustivel: string): this {
            this.entity.tipo_combustivel = tipo_combustivel
            return this
        }

        numMaxParadas(num_max_paradas: number): this {
            this.entity.num_max_paradas = num_max_paradas
            return this
        }

        tempoMaxHoras(tempo_max_horas: string): this {
            this.entity.tempo_max_horas = tempo_max_horas
            return this
        }

        distanciaMax(distancia_max: number): this {
            this.entity.distancia_max = distancia_max
            return this
        }

        tipoViagem(tipo_viagem: string): this {
            this.entity.tipo_viagem = tipo_viagem
            return this
        }

        pessoa(pessoa_id: number): this {
            this.entity.pessoa_id = pessoa_id
            return this
        }

        estaSendoUtilizado(simOuNao: boolean): this {
            this.entity.veiculo_esta_sendo_utilizado_no_momento = simOuNao
            return this
        }
    }
}