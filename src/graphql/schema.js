const makeExecutableSchema = require('graphql-tools').makeExecutableSchema
const merge = require('lodash').merge
const rotasResolver = require('./resources/rotas/rotas.resolver')
const Query = require('./query')
const Mutation = require('./mutation')
const Subscription = require('./subscription')
const rotasTypes = require('./resources/rotas/rotas.schema').type

const SchemaDefinition = `
    type Schema{
        query: Query
        mutation: Mutation
        subscription: Subscription
    }
`

const resolvers = merge(
    rotasResolver,
)

module.exports = makeExecutableSchema({
    typeDefs: [
        SchemaDefinition,
        Query,
        Mutation,
        Subscription,
        rotasTypes
    ],
    resolvers
})