import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, ID, Field } from "type-graphql";
import Builder from "../../../shared/Builder";

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

    @Column()
    public ativo: boolean

    static Builder = class MatrizBuilder extends Builder<Matriz> {
        constructor() { super(new Matriz()) }

        nome(nome: string): this {
            this.entity.nome = nome
            return this
        }

        cnpj(cnpj: string): this {
            this.entity.cnpj = cnpj
            return this
        }

        telefone(telefone: string): this {
            this.entity.telefone = telefone
            return this
        }

        site(site: string): this {
            this.entity.site = site
            return this
        }

        contato(contato: string): this {
            this.entity.contato = contato
            return this
        }

        identificadorSistemaOrigem(identificador_sistema_origem: string): this {
            this.entity.identificador_sistema_origem = identificador_sistema_origem
            return this
        }

        ativo(ativo: boolean): this {
            this.entity.ativo = ativo
            return this
        }
    }
}