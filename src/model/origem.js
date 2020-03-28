const Sequelize = require('sequelize')

class Origem extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: false
            },
            cep: {
                type: Sequelize.STRING,
                allowNull: false
            },
            bairro: {
                type: Sequelize.STRING,
                allowNull: false
            },
            complemento: Sequelize.STRING,
            municipio: {
                type: Sequelize.STRING,
                allowNull: false
            },
            estado: {
                type: Sequelize.STRING,
                allowNull: false
            },
            pais: {
                type: Sequelize.STRING,
                allowNull: false
            },
            logradouro: {
                type: Sequelize.STRING,
                allowNull: false
            },
            numero: Sequelize.STRING,
            horario_operacao: Sequelize.STRING
        }, {
            sequelize,
            tableName: 'origem'
        })

        return this
    }
}

module.exports = Origem