const sub = require('graphql-subscriptions').PubSub()

module.exports = {
    Query: {
        rotas: () => {
            return [
                { origem: 12345, destino: 12345}
            ]
        }
    },

    Mutation: {
        createRota: (parent, { input }) => {
            console.log(input, parent)
            return { parent, input }
        }
    },

    Subscription: {
        rotaCriada: {
            // TODO: IMPLEMENTAR -> https://www.apollographql.com/docs/apollo-server/data/subscriptions/
            subscribe: () => sub.asyncIterator('ROTA_ADD')
        }
    }
}