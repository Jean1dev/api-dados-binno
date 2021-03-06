import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, Float } from "type-graphql";
import Pessoa from "../../pessoa/model/Pessoa";
import SituacaoRota from "../SituacaoRota.enum";
import Builder from "../../../shared/Builder";
import Entidade from "../../../shared/Entidade";
import TipoRota from "../TipoRota.enum";

@Entity('rota')
@ObjectType()
export default class Rota extends Entidade {

    @PrimaryGeneratedColumn('increment')
    @Field(() => Number)
    id: number

    @Column()
    @Field(() => String)
    nome: string

    @Column()
    @Field(() => Number)
    qtdEntregas: number

    @Column()
    @Field(() => Float)
    kilometragem: number

    @Field(() => String)
    @Column()
    cor?: string

    @Column()
    @Field(() => String)
    tempoEstimado: string

    @Column()
    @Field(() => String)
    localDePartida: string

    @Column()
    geocoding: String

    @Field(() => String)
    geocodingURI?: string

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
    criado_por: number

    @Column()
    @Field(() => Pessoa)
    enviado_para?: number

    @Column('int')
    @Field(type => SituacaoRota)
    situacao_rota: SituacaoRota

    @Column('int')
    @Field(type => TipoRota)
    tipo: TipoRota

    static Builder = class RotaBuilder extends Builder<Rota> {
        constructor() { super(new Rota()) }

        tipo(tipo: TipoRota): this {
            this.entity.tipo = tipo
            return this
        }

        matriz_id(matriz_id: number): this {
            this.entity.matriz_id = matriz_id
            return this
        }

        qtdEntregas(qtdEntregas: number): this {
            this.entity.qtdEntregas = qtdEntregas
            return this
        }

        kilometragem(kilometragem: number): this {
            this.entity.kilometragem = kilometragem
            return this
        }

        tempoEstimado(tempoEstimado: string): this {
            this.entity.tempoEstimado = tempoEstimado
            return this
        }

        localDePartida(localDePartida: string): this {
            this.entity.localDePartida = localDePartida
            return this
        }

        nome(nome: string): this {
            this.entity.nome = nome
            return this
        }

        geocoding(geocoding: String): this {
            this.entity.geocoding = geocoding
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

        enviado_para(enviado_para: number | undefined): this {
            this.entity.enviado_para = enviado_para
            return this
        }

        situacao_rota(situacao_rota: SituacaoRota): this {
            this.entity.situacao_rota = situacao_rota
            return this
        }

        cor(cor: string): this {
            this.entity.cor = cor
            return this
        }
    }
}