import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addMatrizIdInAllTables1592699386100 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('pessoa', new TableColumn({
            name: 'matriz_id',
            type: 'integer',
            isNullable: true
        }))

        await queryRunner.addColumn('veiculo', new TableColumn({
            name: 'matriz_id',
            type: 'integer',
            isNullable: true
        }))
        
        await queryRunner.addColumn('rota', new TableColumn({
            name: 'matriz_id',
            type: 'integer',
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('rota', 'matriz_id')
        await queryRunner.dropColumn('veiculo', 'matriz_id')
        await queryRunner.dropColumn('pessoa', 'matriz_id')
    }

}
