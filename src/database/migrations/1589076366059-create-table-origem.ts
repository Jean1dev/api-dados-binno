import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createTableOrigem1589076366059 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'origem',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    generationStrategy: 'increment',
                    isGenerated: true
                },
                {
                    name: 'nome',
                    type: 'varchar'
                },
                {
                    name: 'cep',
                    type: 'varchar'
                },
                {
                    name: 'bairro',
                    type: 'varchar'
                },
                {
                    name: 'complemento',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'municipio',
                    type: 'varchar'
                },
                {
                    name: 'estado',
                    type: 'varchar'
                },
                {
                    name: 'pais',
                    type: 'varchar'
                },
                {
                    name: 'logradouro',
                    type: 'varchar'
                },
                {
                    name: 'numero',
                    type: 'integer',
                    isNullable: true
                },
                {
                    name: 'horario_operacao',
                    type: 'varchar',
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
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('origem')
    }

}
