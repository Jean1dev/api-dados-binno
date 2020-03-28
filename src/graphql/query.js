const { queries: rotas } = require('./resources/rotas/rotas.schema')
const { queries: matriz } = require('./resources/matriz/matriz.schema')
const { queries: origem } = require('./resources/origem/origem.schema')
const { queries: pessoa } = require('./resources/pessoa/pessoa.schema')
const { queries: veiculo } = require('./resources/veiculo/veiculo.schema')

const Query = `
    type Query{
        ${rotas}
        ${matriz}
        ${origem}
        ${veiculo}
        ${pessoa}
    }
`

module.exports = Query