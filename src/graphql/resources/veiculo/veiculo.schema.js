const type = `
    # Veiculo definition type
    type Veiculo {
        id: ID!
        placa: String!
        capacidade_carga: String
        consumo_medio: String
        tipo_combustivel: String
        num_max_paradas: Int
        tempo_max_horas: String
        distancia_max: Float
        tipo_viagem: String
        pessoa: Pessoa!
    }

    input VeiculoCreateInput {
        placa: String!
        capacidade_carga: String
        consumo_medio: String
        tipo_combustivel: String
        num_max_paradas: Int
        tempo_max_horas: String
        distancia_max: Float
        tipo_viagem: String
        pessoa: Int!
    }

    input VeiculoUpdateInput {
        id: ID!
        placa: String
        capacidade_carga: String
        consumo_medio: String
        tipo_combustivel: String
        num_max_paradas: Int
        tempo_max_horas: String
        distancia_max: Float
        tipo_viagem: String
        pessoa: Int!
    }
`

const queries = `
    veiculos(first: Int, offset: Int): [ Veiculo ]
    veiculo(id: ID!): Veiculo
`

const mutations = `
    createVeiculo(input: VeiculoCreateInput): Veiculo
    updateVeiculo(input: VeiculoUpdateInput): Veiculo
    deleteVeiculo(id: ID!): Boolean
`

module.exports = {
    type,
    queries,
    mutations
}