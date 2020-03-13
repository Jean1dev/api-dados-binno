const restful = require('node-restful')
const mongoose = restful.mongoose

const Rota = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
}, {
    collection: 'rotas'
})

module.exports = {
    schema: Rota,
    rest: restful.model('Rota', Rota)
}
