import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Field, ObjectType} from "type-graphql";
import Pessoa from "../../pessoa/model/Pessoa";
import Builder from "../../../shared/Builder";
import Geocoding from "../graphql/types/Geocoding";
import {IGeocoding} from "./Geocoding.model";
import SituacaoProcessamento from "../SituacaoProcessamento.enum";

@Entity('roteirizacao')
@ObjectType()
export default class Roteirizacao extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    @Field(() => Number)
    id: number

    @Column({ type: 'json'})
    @Field(() => Geocoding)
    geocoding: IGeocoding

    @Field(() => String)
    geocodingString?: string

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

    @Column()
    matriz_id?: number

    static Builder = class RoteirizacaoBuilder extends Builder<Roteirizacao> {

        constructor() {
            super(new Roteirizacao());
        }

        situacao(situacao: SituacaoProcessamento): this {
            this.entity.situacao = situacao
            return this
        }

        geocoding(geocoding: IGeocoding): this {
            this.entity.geocoding = geocoding
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
    }
}