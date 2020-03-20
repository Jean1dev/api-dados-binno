const Sequelize = require('sequelize')

class Veiculo extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            placa: Sequelize.STRING,
            capacidade_carga: Sequelize.STRING,
            consumo_medio: Sequelize.STRING,
            tipo_combustivel: Sequelize.STRING,
            num_max_paradas: Sequelize.INTEGER,
            tempo_max_horas: Sequelize.STRING,
            distancia_max: Sequelize.DOUBLE,
            tipo_viagem: Sequelize.STRING,
            pessoa_id: Sequelize.STRING
        }, {
            sequelize
        })

        return this
    }

    static associate(models) {
        this.belongsTo(models.Pessoa, { foreignKey: 'pessoa_id', as: 'pessoa'})
    }
}

module.exports = Veiculo