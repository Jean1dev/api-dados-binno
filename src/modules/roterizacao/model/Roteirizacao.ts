import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Field, ObjectType} from "type-graphql";
import Pessoa from "../../pessoa/model/Pessoa";
import Builder from "../../../shared/Builder";
import SituacaoProcessamento from "../SituacaoProcessamento.enum";
import Entidade from "../../../shared/Entidade";

@Entity('roteirizacao')
@ObjectType()
export default class Roteirizacao extends Entidade {

    @PrimaryGeneratedColumn('increment')
    @Field(() => Number)
    id: number

    @Field(() => String)
    @Column()
    geocodingURI?: string

    @Field(() => String)
    @Column()
    cor?: string

    @Column()
    @Field(() => Boolean)
    teveAlgumaRotaCriada?: boolean

    @Column()
    @Field(() => Pessoa)
    pessoa_id: number

    @Column()
    @Field(() => Number)
    sequencial?: number

    @Column('int')
    @Field(returns => SituacaoProcessamento)
    situacao: SituacaoProcessamento

    @Column()
    @Field(() => String)
    descricao?: string

    static Builder = class RoteirizacaoBuilder extends Builder<Roteirizacao> {

        constructor() {
            super(new Roteirizacao());
        }

        situacao(situacao: SituacaoProcessamento): this {
            this.entity.situacao = situacao
            return this
        }

        teveAlgumaRotaCriada(teveAlgumaRotaCriada: boolean): this {
            this.entity.teveAlgumaRotaCriada = teveAlgumaRotaCriada
            return this
        }

        descricao(descricao: string): this {
            this.entity.descricao = descricao
            return this
        }

        pessoa_id(pessoa_id: number): this {
            this.entity.pessoa_id = pessoa_id
            return this
        }

        matriz_id(matriz_id: number): this {
            this.entity.matriz_id = matriz_id
            return this
        }

        geocodingURI(geocodingURI: string): this {
            this.entity.geocodingURI = geocodingURI
            return this
        }

        cor(cor: string): this {
            this.entity.cor = cor
            return this
        }
    }
}