import { registerEnumType } from "type-graphql"

enum TipoRota {
    SEM_TIPO,
    SEM_ENTREGA
}

registerEnumType(TipoRota, {
    name: 'TipoRota',
    description: 'Representa a tipo da rotas'
})

export default TipoRota