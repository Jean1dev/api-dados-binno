import { registerEnumType } from "type-graphql"

enum SituacaoRota {
    TODOS,
    PLANEJADA,
    EM_ANDAMENTO,
    CONCLUIDA
}

registerEnumType(SituacaoRota, {
    name: 'SituacaoRota',
    description: 'Representa a situacao das rotas'
})

export default SituacaoRota