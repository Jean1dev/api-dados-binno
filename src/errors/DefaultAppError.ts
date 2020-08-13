export default class DefaultAppError {

    public readonly message: string

    public readonly statusCode: number

    constructor(message: string, statusCode = 400, error?: Error) {
        this.message = message
        this.statusCode = statusCode
    }
}