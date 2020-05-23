import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addSituacaoOnRota1590112383963 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('rota', new TableColumn({
            name: 'situacao_rota',
            default: 1,
            type: 'integer',
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('rota', 'situacao_rota')
    }

}
