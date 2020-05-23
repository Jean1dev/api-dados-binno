import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addFlagUtilizandoEmVeiculo1590193444673 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('veiculo', new TableColumn({
            name: 'veiculo_esta_sendo_utilizado_no_momento',
            type: 'boolean',
            default: false
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('veiculo', 'veiculo_esta_sendo_utilizado_no_momento')
    }

}
