const { mutations: rotas } = require('./resources/rotas/rotas.schema')
const { mutations: matriz } = require('./resources/matriz/matriz.schema')
const { mutations: origem } = require('./resources/origem/origem.schema')
const { mutations: pessoa } = require('./resources/pessoa/pessoa.schema')
const { mutations: veiculo } = require('./resources/veiculo/veiculo.schema')

const Mutation = `
    type Mutation{
        ${rotas}
        ${matriz}
        ${origem}
        ${veiculo}
        ${pessoa}
    }
`
module.exports = Mutation