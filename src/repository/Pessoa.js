const BasicRepositoy = require('./BasicRepository')
const PessoaModel = require('../model/pessoa')

class PessoaRepository extends BasicRepositoy {
    constructor() {
        super(PessoaModel)
    }
}

module.exports = new PessoaRepository()