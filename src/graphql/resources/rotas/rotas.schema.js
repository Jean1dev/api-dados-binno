const type = `
    # Rota definition type
    type Rota {
        id: ID!
        rota_calculada: String!
        criador: Pessoa!
        recebedor: Pessoa!
        confimada: Boolean
        observacoes: String
        finalizada: Boolean
    }

    input RotaCreateInput {
        rota_calculada: String!
        criado_por: Int!
        enviado_para: Int!
        confimada: Boolean
        observacoes: String
        finalizada: Boolean
    }

    input RotaUpdateInput {
        enviado_para: Int
        confimada: Boolean
        observacoes: String
        finalizada: Boolean
    }
`

const queries = `
    rotas(first: Int, offset: Int): [ Rota ]
    rota(id: ID!): Rota
`

const mutations = `
    createRota(input: RotaCreateInput): Rota
    updateRota(input: RotaUpdateInput): Rota
    deleteRota(id: ID!): Boolean
`

const subscription = `
    rotaCriada: Rota
`

module.exports = {
    type,
    queries,
    mutations,
    subscription
}