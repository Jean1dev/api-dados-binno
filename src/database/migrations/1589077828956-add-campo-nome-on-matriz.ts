import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addCampoNomeOnMatriz1589077828956 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('matriz', new TableColumn({
            name: 'nome',
            type: 'varchar',
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('matriz', 'nome')
    }

}
