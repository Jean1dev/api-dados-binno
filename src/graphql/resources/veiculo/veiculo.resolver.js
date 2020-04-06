module.exports = {
    Veiculo: {
        pessoa: (veiculo, args, { db }, graphQlResolver) => {
            return db.Pessoa.findOne({
                where: {
                    id : veiculo.get('pessoa_id')
                }
            })
        }
    },
    Query: {
        veiculos: async (parent, { first = 10, offset = 0 }, { db }, graphQlResolver) => {
            return await db.Veiculo.findAll({
                limit: first,
                offset: offset
            })
        },

        veiculo: async (parent, { id }, { db }) => {
            return await db.Veiculo.findByPk(parseInt(id))
        }
    },

    Mutation: {
        createVeiculo: (parent, { input }, { db, transaction }) => {
            return db.Veiculo.create(input)
        },

        updateVeiculo: (parent, { input }, { db, transaction}) => {
            return db.Veiculo.findByPk(parseInt(input.id))
                .then((v) => {
                    return v.update(input)
                })
        },

        deleteVeiculo: (parent, { id } , { db }) => {
            return db.Veiculo.findByPk(parseInt(id))
                .then((v) => {
                    return v.destroy().then(veiculo => !!veiculo)
                })
        }
    }
}