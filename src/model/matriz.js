const Sequelize = require('sequelize')

class Matriz extends Sequelize.Model {
    static init(sequelize) {
        super.init({
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