import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class alterColumTipoPessoa1590247138257 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.changeColumn('pessoa', 'tipo', new TableColumn({
            name: 'tipo',
            type: 'integer',
            default: 0
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
