const BasicRepositoy = require('./BasicRepository')
const OrigemModel = require('../model/origem')

class OrigemRepository extends BasicRepositoy {
    constructor() {
        super(OrigemModel)
    }
}

module.exports = new OrigemRepository()