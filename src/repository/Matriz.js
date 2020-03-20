const BasicRepositoy = require('./BasicRepository')
const MatrizModel = require('../model/matriz')

class MatrizRepository extends BasicRepositoy {
    constructor() {
        super(MatrizModel)
    }
}

module.exports = new MatrizRepository()