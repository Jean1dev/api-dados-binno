const Sequelize = require('sequelize')

class Veiculo extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            placa: {
                type: Sequelize.STRING,
                allowNull: false
            },
            capacidade_carga: Sequelize.STRING,
            consumo_medio: Sequelize.STRING,
            tipo_combustivel: Sequelize.STRING,
            num_max_paradas: Sequelize.INTEGER,
            tempo_max_horas: Sequelize.STRING,
            distancia_max: Sequelize.DOUBLE,
            tipo_viagem: Sequelize.STRING,
            pessoa_id: Sequelize.STRING
        }, {
            sequelize,
            tableName: 'veiculo'
        })

        return this
    }

    static associate(models) {
        this.belongsTo(models.Pessoa, { foreignKey: 'pessoa_id', as: 'pessoa' })
    }
}

module.exports = Veiculo