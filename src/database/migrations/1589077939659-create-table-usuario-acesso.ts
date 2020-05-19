import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createTableUsuarioAcesso1589077939659 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'usuario_acesso',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    generationStrategy: 'increment',
                    isGenerated: true
                },
                {
                    name: 'login',
                    type: 'varchar'
                },
                {
                    name: 'password',
                    type: 'varchar',
                },
                {
                    name: 'identificador_sistema_origem',
                    type: 'varchar',
                },
                {
                    name: 'pessoa',
                    type: 'integer'
                },
                {
                    name: 'matriz',
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

        await queryRunner.createForeignKey('usuario_acesso', new TableForeignKey({
            name: 'usuario_acesso_pessoa',
            columnNames: ['pessoa'],
            referencedColumnNames: ['id'],
            referencedTableName: 'pessoa',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }))

        await queryRunner.createForeignKey('usuario_acesso', new TableForeignKey({
            name: 'usuario_acesso_matriz',
            columnNames: ['matriz'],
            referencedColumnNames: ['id'],
            referencedTableName: 'matriz',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('usuario_acesso', 'usuario_acesso_matriz')
        await queryRunner.dropForeignKey('usuario_acesso', 'usuario_acesso_pessoa')
        await queryRunner.dropTable('usuario_acesso')
    }

}
