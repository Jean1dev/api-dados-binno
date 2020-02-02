const rotas = require('./resources/rotas/rotas.schema').queries

const Query = `
    type Query{
        ${rotas}
    }
`

module.exports = Query