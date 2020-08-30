import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import Pessoa from "../../pessoa/model/Pessoa";
import Builder from "../../../shared/Builder";
import Entidade from "../../../shared/Entidade";

@Entity('configuracao')
@ObjectType()
export default class Configuracao extends Entidade {

    @PrimaryGeneratedColumn('increment')
    @Field(() => ID)
    id: number

    @Column()
    @Field(() => Pessoa)
    motorista_padrao: number

    static Builder = class ConfiguracaoBuilder extends Builder<Configuracao> {
        constructor() { super(new Configuracao()) }

        motoristaPadrao(motoristaId: number): this {
            this.entity.motorista_padrao = motoristaId
            return this
        }

        matrizId(matrizId: number): this {
            this.entity.matriz_id = matrizId
            return this
        }
    }
}