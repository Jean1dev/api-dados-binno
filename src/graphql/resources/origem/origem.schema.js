const type = `
    # Origem definition type
    type Origem {
        id: ID!
        nome: String!
        cep: String!
        bairro: String!
        complemento: String
        municipio: String!
        estado: String!
        pais: String!
        logradouro: String!
        numero: String
        horario_operacao: String
    }

    input OrigemCreateInput {
        nome: String!
        cep: String!
        bairro: String!
        complemento: String
        municipio: String!
        estado: String!
        pais: String!
        logradouro: String!
        numero: String
        horario_operacao: String
    }

    input OrigemUpdateInput {
        id: ID!
        nome: String
        cep: String
        bairro: String
        complemento: String
        municipio: String
        estado: String
        pais: String
        logradouro: String
        numero: String
        horario_operacao: String
    }
`

const queries = `
    origens(first: Int, offset: Int): [ Origem ]
    origem(id: ID!): Origem
`

const mutations = `
    createOrigem(input: OrigemCreateInput): Origem
    updateOrigem(input: OrigemUpdateInput): Origem
`

module.exports = {
    type,
    queries,
    mutations
}