import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addTipoOnRotas1601742321211 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('roteirizacao', new TableColumn({
            name: 'tipo',
            type: 'integer',
            default: 0
        }))

        await queryRunner.addColumn('rota', new TableColumn({
            name: 'tipo',
            type: 'integer',
            default: 0
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('rota', 'tipo')
        await queryRunner.dropColumn('roteirizacao', 'tipo')
    }

}
