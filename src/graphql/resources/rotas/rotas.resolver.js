const sub = require('../../pubsub')

module.exports = {
    Rota: {
        criador: (rota, args, { db }, graphQlResolver) => {
            return db.Pessoa.findOne({
                where: {
                    id : rota.get('criado_por')
                }
            })
        },

        recebedor: (rota, args, { db }, graphQlResolver) => {
            return db.Pessoa.findOne({
                where: {
                    id : rota.get('enviado_para')
                }
            })
        }
    },

    Query: {
        rotas: async (parent, { first = 10, offset = 0 }, { db }, graphQlResolver) => {
            return await db.Rota.findAll({
                limit: first,
                offset: offset
            })
        },

        rota: async (parent, { id }, { db }) => {
            return await db.Rota.findByPk(parseInt(id))
        }
    },

    Mutation: {
        createRota: async (parent, { input }, { db, transaction }) => {
            const res = await db.Rota.create(input)
            sub.publish('ROTA_ADD', { rotaCriada : input });
            return res
        },

        updateRota: (parent, { input }, { db, transaction}) => {
            return db.Rota.findByPk(parseInt(input.id))
                .then(async (r) => {
                    const res = await r.update(input)
                    sub.publish('ROTA_ADD', { rotaCriada : res })
                    return res
                })
        },

        deleteRota: (parent, { id } , { db }) => {
            return db.Rota.findByPk(parseInt(id))
                .then((r) => {
                    return r.destroy().then(rota => !!rota)
                })
        }
    },

    Subscription: {
        rotaCriada: {
            // TODO: IMPLEMENTAR -> https://www.apollographql.com/docs/apollo-server/data/subscriptions/
            subscribe: () => sub.asyncIterator(['ROTA_ADD'])
        }
    }
}