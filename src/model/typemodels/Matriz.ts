import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('matriz')
export default class Matriz {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    nome: string

    @Column()
    cnpj: string

    @Column()
    telefone: string

    @Column()
    site: string

    @Column()
    contato: string

    @Column()
    identificador_sistema_origem: string
}