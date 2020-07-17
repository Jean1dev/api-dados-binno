import { singleton } from "tsyringe"

interface IAuthenticationData {
    matriz_id?: number
    userAccess?: number
}

@singleton()
export default class AuthenticationHolder {
    private auth: IAuthenticationData = {}

    public setAuthenticationData({ matriz_id, userAccess }: IAuthenticationData): void {
        this.auth.matriz_id = matriz_id
        this.auth.userAccess = userAccess
    }

    public getAuthenticationData(): IAuthenticationData {
        return this.auth
    }
}
