import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createTableMatriz1589076004038 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'matriz',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    generationStrategy: 'increment',
                    isGenerated: true
                },
                {
                    name: 'cnpj',
                    type: 'varchar'
                },
                {
                    name: 'telefone',
                    type: 'varchar'
                },
                {
                    name: 'site',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'contato',
                    type: 'varchar'
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
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('matriz')
    }

}
