module.exports = {
    Query: {
        origens: async (parent, { first = 10, offset = 0 }, { db }, graphQlResolver) => {
            return await db.Origem.findAll({
                limit: first,
                offset: offset
            })
        },

        origem: async (parent, { id }, { db }) => {
            return await db.Origem.findByPk(parseInt(id))
        }
    },

    Mutation: {
        createOrigem: (parent, { input }, { db, transaction }) => {
            return db.Origem.create(input)
        },

        updateOrigem: (parent, { input }, { db, transaction}) => {
            return db.Origem.findByPk(parseInt(input.id))
                .then((origem) => {
                    return origem.update(input)
                })
        }
    }
}