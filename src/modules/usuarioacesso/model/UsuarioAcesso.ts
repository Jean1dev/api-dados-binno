import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('usuario_acesso')
export default class UsuarioAcesso {

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
}