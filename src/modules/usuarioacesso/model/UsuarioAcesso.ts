import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import Builder from "../../../shared/Builder";

@Entity('usuario_acesso')
export default class UsuarioAcesso extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    login: string

    @Column()
    password: string

    @Column()
    pessoa: number

    @Column()
    matriz: number

    @Column()
    identificador_sistema_origem: string

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
    }
}