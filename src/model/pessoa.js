const Sequelize = require('sequelize')

class Pessoa extends Sequelize.Model {
    static init(sequelize) {
        super.init({
            primeiro_nome: Sequelize.STRING,
            ultimo_nome: Sequelize.STRING,
            cep: Sequelize.STRING,
            bairro: Sequelize.STRING,
            complemento: Sequelize.STRING,
            municipio: Sequelize.STRING,
            estado: Sequelize.STRING,
            pais: Sequelize.STRING,
            logradouro: Sequelize.STRING,
            numero: Sequelize.STRING,
            email: Sequelize.STRING,
            observacao: Sequelize.STRING,
            rg: Sequelize.STRING,
            cnh: Sequelize.STRING,
            cpf: Sequelize.STRING,
            tipo: Sequelize.STRING
        }, {
            sequelize
        })

        return this
    }
}

module.exports = Pessoa