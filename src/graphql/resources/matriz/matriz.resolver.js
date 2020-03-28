module.exports = {
    Query: {
        matrizes: async (parent, { first = 10, offset = 0 }, { db }, graphQlResolver) => {
            return await db.Matriz.findAll({
                limit: first,
                offset: offset
            })
        },

        matriz: async (parent, { id }, { db }) => {
            return await db.Matriz.findByPk(parseInt(id))
        }
    },

    Mutation: {
        createMatriz: (parent, { input }, { db, transaction }) => {
            // TODO : tratar transacacoes
            // return transaction(t => {
            return db.Matriz.create(input)
            // })
        },

        updateMatriz: (parent, { input }, { db, transaction}) => {
            return db.Matriz.findByPk(parseInt(input.id))
                .then((matriz) => {
                    return matriz.update(input)
                })
        }
    },

}