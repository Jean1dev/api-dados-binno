const type = `
    # Matriz definition type
    type Matriz {
        id: ID!
        cnpj: String!
        telefone: String
        site: String
        contato: String
    }

    input MatrizCreateInput {
        cnpj: String!
        telefone: String
        site: String
        contato: String
    }

    input MatrizUpdateInput {
        id: ID!
        cnpj: String
        telefone: String
        site: String
        contato: String
    }
`

const queries = `
    matrizes(first: Int, offset: Int): [ Matriz ]
    matriz(id: ID!): Matriz
`

const mutations = `
    createMatriz(input: MatrizCreateInput): Matriz
    updateMatriz(input: MatrizUpdateInput): Matriz
`

module.exports = {
    type,
    queries,
    mutations
}