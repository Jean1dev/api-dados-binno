const schema = require('../schema/Rota').rest

schema.methods(['get', 'post', 'put', 'delete'])

module.exports = schema
