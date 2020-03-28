const makeExecutableSchema = require('graphql-tools').makeExecutableSchema
const merge = require('lodash').merge
const Query = require('./query')
const Mutation = require('./mutation')
const Subscription = require('./subscription')

const rotasTypes = require('./resources/rotas/rotas.schema').type
const rotasResolver = require('./resources/rotas/rotas.resolver')

const matrizTypes = require('./resources/matriz/matriz.schema').type
const matrizResolver = require('./resources/matriz/matriz.resolver')

const origemTypes = require('./resources/origem/origem.schema').type
const origemResolver = require('./resources/origem/origem.resolver')

const pessoaTypes = require('./resources/pessoa/pessoa.schema').type
const pessoaResolver = require('./resources/pessoa/pessoa.resolver')

const veiculoTypes = require('./resources/veiculo/veiculo.schema').type
const veiculoResolver = require('./resources/veiculo/veiculo.resolver')

const SchemaDefinition = `
    type Schema{
        query: Query
        mutation: Mutation
        subscription: Subscription
    }
`

const resolvers = merge(
    rotasResolver,
    matrizResolver,
    origemResolver,
    veiculoResolver,
    pessoaResolver,
)

module.exports = makeExecutableSchema({
    typeDefs: [
        SchemaDefinition,
        Query,
        Mutation,
        Subscription,
        rotasTypes,
        matrizTypes,
        origemTypes,
        veiculoTypes,
        pessoaTypes,
    ],
    resolvers,
})