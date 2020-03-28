const Sequelize = require('sequelize')

class Matriz extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            cnpj: Sequelize.STRING,
            telefone: Sequelize.STRING,
            site: Sequelize.STRING,
            contato: Sequelize.STRING,
        }, {
            sequelize,
            tableName: 'matriz'
        })

        return this
    }
}

module.exports = Matriz