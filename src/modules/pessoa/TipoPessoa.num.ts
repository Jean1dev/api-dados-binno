import { registerEnumType } from "type-graphql";

enum TipoPessoa {
    ADMINISTRADOR,
    MOTORISTA
}

registerEnumType(TipoPessoa, {
    name: 'TipoPessoa',
    description: 'Representa o tipo da pessoa'
})

export default TipoPessoa