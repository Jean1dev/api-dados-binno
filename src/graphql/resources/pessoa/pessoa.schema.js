const type = `
    # Pessoa definition type
    type Pessoa {
        id: ID!
        primeiro_nome: String!
        ultimo_nome: String!
        cep: String!
        bairro: String!
        complemento: String
        municipio: String!
        estado: String!
        pais: String!
        logradouro: String
        numero: String
        email: String!
        observacao: String
        rg: String
        cnh: String
        cpf: String
        tipo: String!
        veiculos: [ Veiculo ]
        rotas: [ Rota ]
    }

    input PessoaCreateInput {
        primeiro_nome: String!
        ultimo_nome: String!
        email: String!
        cep: String!
        bairro: String!
        complemento: String
        municipio: String!
        estado: String!
        pais: String!
        logradouro: String!
        numero: String
        observacao: String
        rg: String
        cnh: String
        cpf: String
        tipo: String!
    }

    input PessoaUpdateInput {
        id: ID!
        primeiro_nome: String
        ultimo_nome: String
        cep: String
        bairro: String
        complemento: String
        municipio: String
        estado: String
        pais: String
        logradouro: String
        numero: String
        email: String
        observacao: String
        rg: String
        cnh: String
        cpf: String
        tipo: String
    }
`

const queries = `
    pessoas(first: Int, offset: Int): [ Pessoa ]
    pessoa(id: ID!): Pessoa
`

const mutations = `
    createPessoa(input: PessoaCreateInput): Pessoa
    updatePessoa(input: PessoaUpdateInput): Pessoa
`

module.exports = {
    type,
    queries,
    mutations
}