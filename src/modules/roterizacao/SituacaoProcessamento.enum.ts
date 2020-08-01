import {registerEnumType} from "type-graphql";

enum SituacaoProcessamento {
    PROCESSANDO,
    CONCLUIDO,
    COM_FALHA
}

registerEnumType(SituacaoProcessamento, {
    name: 'SituacaoProcessamento',
    description: 'representa o estado do processamento da roteirizacao'
})

export default SituacaoProcessamento