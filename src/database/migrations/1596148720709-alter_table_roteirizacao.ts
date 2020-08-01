import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class alterTableRoteirizacao1596148720709 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('roteirizacao', new TableColumn({
            name: 'situacao',
            type: 'integer',
            default: 0
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('roteirizacao', 'situacao')
    }

}
