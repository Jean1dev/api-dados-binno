import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createTableRota1589077555720 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'rota',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    generationStrategy: 'increment',
                    isGenerated: true
                },
                {
                    name: 'rota_calculada',
                    type: 'varchar'
                },
                {
                    name: 'criado_por',
                    type: 'integer',
                },
                {
                    name: 'enviado_para',
                    type: 'integer',
                },
                {
                    name: 'confimada',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'observacoes',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'finalizada',
                    type: 'boolean',
                    default: false
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

        await queryRunner.createForeignKey('rota', new TableForeignKey({
            name: 'rota_criado_por',
            columnNames: ['criado_por'],
            referencedColumnNames: ['id'],
            referencedTableName: 'pessoa',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }))

        await queryRunner.createForeignKey('rota', new TableForeignKey({
            name: 'rota_enviado_para',
            columnNames: ['enviado_para'],
            referencedColumnNames: ['id'],
            referencedTableName: 'pessoa',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('rota', 'rota_enviado_para')
        await queryRunner.dropForeignKey('rota', 'rota_criado_por')
        await queryRunner.dropTable('rota')
    }

}
