import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addIdentificadorUnicoOnMatriz1589078137407 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('matriz', new TableColumn({
            name: 'identificador_sistema_origem',
            type: 'varchar',
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('matriz', 'identificador_sistema_origem')
    }

}
