const Sequelize = require('sequelize')

class Origem extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            nome: Sequelize.STRING,
            cep: Sequelize.STRING,
            bairro: Sequelize.STRING,
            complemento: Sequelize.STRING,
            municipio: Sequelize.INTEGER,
            estado: Sequelize.STRING,
            pais: Sequelize.DOUBLE,
            logradouro: Sequelize.STRING,
            numero: Sequelize.STRING,
            horario_operacao: Sequelize.STRING
        }, {
            sequelize
        })

        return this
    }
}

module.exports = Origem