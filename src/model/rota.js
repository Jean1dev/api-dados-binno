const Sequelize = require('sequelize')

class Rota extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            rota_calculada: Sequelize.STRING,
            confimada: Sequelize.BOOLEAN,
            observacoes: Sequelize.STRING,
            finalizada: Sequelize.BOOLEAN
        }, {
            sequelize,
            tableName: 'rota'
        })
    }

    static associate(models) {
        this.belongsTo(models.Pessoa, { foreignKey: 'criado_por', as: 'criador' })
        this.belongsTo(models.Pessoa, { foreignKey: 'enviado_para', as: 'recebedor' })
    }
}

module.exports = Rota