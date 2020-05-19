import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createTablePessoa1589076684568 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'pessoa',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    generationStrategy: 'increment',
                    isGenerated: true
                },
                {
                    name: 'primeiro_nome',
                    type: 'varchar'
                },
                {
                    name: 'ultimo_nome',
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
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true
                },
                {
                    name: 'observacao',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'rg',
                    type: 'varchar',
                },
                {
                    name: 'cnh',
                    type: 'varchar'
                },
                {
                    name: 'cpf',
                    type: 'varchar'
                },
                {
                    name: 'tipo',
                    type: 'varchar',
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
        await queryRunner.dropTable('pessoa')
    }

}
