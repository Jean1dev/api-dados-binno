import { BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm"

export default class Entidade extends BaseEntity {
    
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    public matriz_id: number

    @Column()
    public ativo: boolean
}