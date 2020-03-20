const BasicRepositoy = require('./BasicRepository')
const VeiculoModel = require('../model/veiculos')

class VeiculoRepository extends BasicRepositoy {
    constructor() {
        super(VeiculoModel)
    }
}

module.exports = new VeiculoRepository()