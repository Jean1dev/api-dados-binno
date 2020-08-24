import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class alterColumnGeocodingOnRoutes1598312097449 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.changeColumn('rota', 'geocoding', new TableColumn({
            name: 'geocoding',
            type: 'varchar',
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
