import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addGeocodingOnRota1595026082576 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.changeColumn('rota', 'rota_calculada', new TableColumn({
            name: 'geocoding',
            isNullable: true,
            type: 'json'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
