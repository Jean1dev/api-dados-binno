import { formatError } from 'graphql'

export default function (graphQLError: any) {
    const erroFormatado = formatError(graphQLError)
    const messageFormatado = erroFormatado.message.replace('Unexpected error value: ', '')
    let message = messageFormatado
    let status = 400

    if (messageFormatado.includes('{')) {
        //const data = JSON.parse(JSON.stringify(messageFormatado))
        message = 'Ocorreu um erro interno, faça login novamente'
        status = 403
    }

    return {
        name: erroFormatado.path,
        message,
        statusCode: status
    }
}