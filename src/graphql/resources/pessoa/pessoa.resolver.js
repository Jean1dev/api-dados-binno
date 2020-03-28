module.exports = {
    Pessoa: {
        veiculos: (pessoa, args, { db }) => {
            return db.Veiculo.findAll({
                where: {
                    pessoa_id: pessoa.get('id')
                }
            })
        }
    },
    Query: {
        pessoas: async (parent, { first = 10, offset = 0 }, { db }, graphQlResolver) => {
            return await db.Pessoa.findAll({
                limit: first,
                offset: offset
            })
        },

        pessoa: async (parent, { id }, { db }) => {
            return await db.Pessoa.findByPk(parseInt(id))
        }
    },

    Mutation: {
        createPessoa: (parent, { input }, { db, transaction }) => {
            return db.Pessoa.create(input)
        },

        updatePessoa: (parent, { input }, { db, transaction}) => {
            return db.Pessoa.findByPk(parseInt(input.id))
                .then((p) => {
                    return p.update(input)
                })
        }
    }
}