const type = `
    # Rota definition type
    type Rota {
        origem: Int!
        destino: Int!
    }

    input RotaCreateInput {
        origem: Int!
        destino: Int!
    }
`

const queries = `
    rotas: [ Rota ]
`

const mutations = `
    createRota(input: RotaCreateInput): Rota
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