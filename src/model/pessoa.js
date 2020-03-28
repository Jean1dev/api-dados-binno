const Sequelize = require('sequelize')

class Pessoa extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            primeiro_nome: {
                type: Sequelize.STRING,
                allowNull: false
            },
            ultimo_nome: {
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
            email: Sequelize.STRING,
            observacao: Sequelize.STRING,
            rg: Sequelize.STRING,
            cnh: Sequelize.STRING,
            cpf: Sequelize.STRING,
            tipo: {
                type: Sequelize.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'pessoa'
        })

        return this
    }
}

module.exports = Pessoa