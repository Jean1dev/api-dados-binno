const schema = require('../model/Rota').rest

schema.methods(['get', 'post', 'put', 'delete'])

module.exports = schema
