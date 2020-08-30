import { MigrationInterface, QueryRunner, TableColumn, Table, TableForeignKey } from "typeorm";

export class createTableConfiguracaoAndMore1598403638097 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('veiculo', new TableColumn({
            name: 'kilometragem_atual',
            type: 'numeric',
            isNullable: true
        }))

        await queryRunner.addColumn('pessoa', new TableColumn({
            name: 'ativo',
            type: 'boolean',
            isNullable: true,
            default: true
        }))

        await queryRunner.addColumn('usuario_acesso', new TableColumn({
            name: 'ativo',
            type: 'boolean',
            isNullable: true,
            default: true
        }))

        await queryRunner.addColumn('matriz', new TableColumn({
            name: 'ativo',
            type: 'boolean',
            isNullable: true,
            default: true
        }))

        await queryRunner.createTable(new Table({
            name: 'configuracao',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    generationStrategy: 'increment',
                    isGenerated: true
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
                },
                {
                    name: 'matriz_id',
                    type: 'integer',
                    isNullable: true
                },
                {
                    name: 'motorista_padrao',
                    type: 'integer',
                    isNullable: true
                },
            ]
        }))

        await queryRunner.createForeignKey('configuracao', new TableForeignKey({
            name: 'configuracao_motorista_padrao',
            columnNames: ['motorista_padrao'],
            referencedColumnNames: ['id'],
            referencedTableName: 'pessoa',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }))

        await queryRunner.addColumn('configuracao', new TableColumn({
            name: 'ativo',
            type: 'boolean',
            isNullable: true,
            default: true
        }))

        await queryRunner.addColumn('roteirizacao', new TableColumn({
            name: 'ativo',
            type: 'boolean',
            isNullable: true,
            default: true
        }))

        await queryRunner.addColumn('veiculo', new TableColumn({
            name: 'ativo',
            type: 'boolean',
            isNullable: true,
            default: true
        }))

        await queryRunner.addColumn('rota', new TableColumn({
            name: 'ativo',
            type: 'boolean',
            isNullable: true,
            default: true
        }))

        await queryRunner.dropTable('origem')
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('matriz', 'ativo')
        await queryRunner.dropColumn('usuario_acesso', 'ativo')
        await queryRunner.dropColumn('pessoa', 'ativo')
        await queryRunner.dropColumn('veiculo', 'kilometragem_atual')
    }

}
