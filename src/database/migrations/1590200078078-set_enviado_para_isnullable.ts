import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class setEnviadoParaIsnullable1590200078078 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.changeColumn('rota', 'enviado_para', new TableColumn({
            name: 'enviado_para',
            type: 'integer',
            isNullable: true
        },))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
