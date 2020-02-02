const PointSchema = require('./utils/PointSchema')
// const mongoose = require('mongoose')
const restful = require('node-restful')
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

module.exports = {
    schema: Rota,
    rest: mongoose.model('Rota', Rota)
}
