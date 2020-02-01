const restful = require('node-restful')
const PointSchema = require('./utils/PointSchema')
const mongoose = restful.mongoose

const Rota = new mongoose.Schema({
    idMotorista: { type: String },
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
}, {
    collection: 'rotas'
})

module.exports = restful.model('Rotas', Rota)
