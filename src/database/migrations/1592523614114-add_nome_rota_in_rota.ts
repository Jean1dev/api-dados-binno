import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addNomeRotaInRota1592523614114 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn('rota', new TableColumn({
            name: 'nome',
            type: 'varchar',
            isNullable: true
        }))

        await queryRunner.addColumn('rota', new TableColumn({
            name: 'qtdEntregas',
            type: 'integer',
            isNullable: true
        }))

        await queryRunner.addColumn('rota', new TableColumn({
            name: 'kilometragem',
            type: 'decimal',
            isNullable: true
        }))

        await queryRunner.addColumn('rota', new TableColumn({
            name: 'tempoEstimado',
            type: 'varchar',
            isNullable: true
        }))

        await queryRunner.addColumn('rota', new TableColumn({
            name: 'localDePartida',
            type: 'varchar',
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('rota', 'localDePartida')
        await queryRunner.dropColumn('rota', 'tempoEstimado')
        await queryRunner.dropColumn('rota', 'kilometragem')
        await queryRunner.dropColumn('rota', 'qtdEntregas')
        await queryRunner.dropColumn('rota', 'nome')
    }

}
