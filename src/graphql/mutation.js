const rotas = require('./resources/rotas/rotas.schema').mutations

const Mutation = `
    type Mutation{
        ${rotas}
    }
`

module.exports = Mutation