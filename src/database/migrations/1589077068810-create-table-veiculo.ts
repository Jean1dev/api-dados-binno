import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createTableVeiculo1589077068810 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'veiculo',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    generationStrategy: 'increment',
                    isGenerated: true
                },
                {
                    name: 'placa',
                    type: 'varchar'
                },
                {
                    name: 'capacidade_carga',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'consumo_medio',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'tipo_combustivel',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'num_max_paradas',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'tempo_max_horas',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'distancia_max',
                    type: 'decimal',
                    isNullable: true
                },
                {
                    name: 'tipo_viagem',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'pessoa_id',
                    type: 'integer'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }))

        await queryRunner.createForeignKey('veiculo', new TableForeignKey({
            name: 'veiculo_pessoa',
            columnNames: ['pessoa_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'pessoa',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('veiculo', 'veiculo_pessoa')
        await queryRunner.dropTable('vaiculo')
    }

}
