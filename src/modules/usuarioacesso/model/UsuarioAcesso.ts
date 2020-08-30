import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"
import Builder from "../../../shared/Builder"
import { ObjectType, Field, ID } from "type-graphql"
import Pessoa from "../../pessoa/model/Pessoa"

@Entity('usuario_acesso')
@ObjectType()
export default class UsuarioAcesso extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    @Field(() => String)
    login: string

    @Column()
    password: string

    @Column()
    @Field(() => Pessoa)
    pessoa: number

    @Column()
    matriz: number

    @Column()
    identificador_sistema_origem: string

    @Column()
    @Field(() => Boolean)
    ativo: boolean

    static Builder = class UsuarioAcessoBuilder extends Builder<UsuarioAcesso> {
        constructor() { super(new UsuarioAcesso()) }

        login(login: string): this {
            this.entity.login = login
            return this
        }

        password(password: string): this {
            this.entity.password = password
            return this
        }

        pessoa(pessoa: number): this {
            this.entity.pessoa = pessoa
            return this
        }

        matriz(matriz: number): this {
            this.entity.matriz = matriz
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