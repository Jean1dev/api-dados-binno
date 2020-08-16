import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addGeocodinguriOnRoteirizacao1597528060634 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('roteirizacao', new TableColumn({
            name: 'geocodingURI',
            type: 'varchar',
            isNullable: true
        }))

        await queryRunner.changeColumn('roteirizacao', 'geocoding', new TableColumn({
            name: 'geocoding',
            isNullable: true,
            type: 'json'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('roteirizacao', 'geocodingURI')
    }

}
