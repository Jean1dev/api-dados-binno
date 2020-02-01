const schema = require('../model/Rota')

schema.methods(['get', 'post', 'put', 'delete'])

module.exports = schema
