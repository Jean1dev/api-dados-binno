import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addCorOnTableRoutes1597964188780 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('roteirizacao', new TableColumn({
            name: 'cor',
            type: 'varchar',
            isNullable: true
        }))

        await queryRunner.addColumn('rota', new TableColumn({
            name: 'cor',
            type: 'varchar',
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('rota', 'cor')
        await queryRunner.dropColumn('roteirizacao', 'cor')
    }

}
