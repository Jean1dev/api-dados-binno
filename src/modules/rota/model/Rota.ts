import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import Pessoa from "../../pessoa/model/Pessoa";
import SituacaoRota from "../SituacaoRota.enum";
import Builder from "../../../shared/Builder";

@Entity('rota')
@ObjectType()
export default class Rota extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    @Field(() => Number)
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

    @Column('int')
    @Field(type => SituacaoRota)
    situacao_rota: SituacaoRota

    static Builder = class RotaBuilder extends Builder<Rota> {
        constructor() { super(new Rota()) }

        buildFrom(data: Rota): Rota {
            return Rota.create(data)
        }

        rota_calculada(rota_calculada: string): this {
            this.entity.rota_calculada = rota_calculada
            return this
        }

        confimada(confimada: boolean): this {
            this.entity.confimada = confimada
            return this
        }

        observacoes(observacoes: string): this {
            this.entity.observacoes = observacoes
            return this
        }

        finalizada(finalizada: boolean): this {
            this.entity.finalizada = finalizada
            return this
        }

        criado_por(criado_por: number): this {
            this.entity.criado_por = criado_por
            return this
        }

        enviado_para(enviado_para: number): this {
            this.entity.enviado_para = enviado_para
            return this
        }

        situacao_rota(situacao_rota: SituacaoRota): this {
            this.entity.situacao_rota = situacao_rota
            return this
        }
    }
}