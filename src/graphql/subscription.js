const rotas = require('./resources/rotas/rotas.schema').subscription

const Subscription = `
    type Subscription {
        ${rotas}
    }
`

module.exports = Subscription