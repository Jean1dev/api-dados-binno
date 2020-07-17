import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createTableRotaRascunho1594851043584 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'roteirizacao',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    generationStrategy: 'increment',
                    isGenerated: true
                },
                {
                    name: 'geocoding',
                    type: 'json'
                },
                {
                    name: 'teveAlgumaRotaCriada',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'descricao',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'pessoa_id',
                    type: 'integer'
                },
                {
                    name: 'sequencial',
                    type: 'integer',
                    default: 1
                },
                {
                    name: 'matriz_id',
                    type: 'integer',
                    isNullable: true
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

        await queryRunner.createForeignKey('roteirizacao', new TableForeignKey({
            name: 'roteirizacao_pessoa',
            columnNames: ['pessoa_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'pessoa',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('roteirizacao', 'roteirizacao_pessoa')
        await queryRunner.dropTable('roteirizacao')
    }

}
