import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('pessoa')
export default class Pessoa{

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    primeiro_nome: string

    @Column()
    ultimo_nome: string

    @Column()
    cep: string

    @Column()
    bairro: string

    @Column()
    complemento: string

    @Column()
    municipio: string

    @Column()
    estado: string

    @Column()
    pais: string

    @Column()
    logradouro: string

    @Column()
    numero: string

    @Column()
    email: string

    @Column()
    observacao: string

    @Column()
    rg: string

    @Column()
    cnh: string

    @Column()
    cpf: string

    @Column()
    tipo: string
}