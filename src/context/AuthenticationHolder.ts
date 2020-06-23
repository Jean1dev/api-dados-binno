import { singleton } from "tsyringe"

interface IAuthenticationData {
    matriz_id?: number
}

@singleton()
export default class AuthenticationHolder {
    private auth: IAuthenticationData = {}

    public setAuthenticationData({ matriz_id }: IAuthenticationData): void {
        this.auth.matriz_id = matriz_id
    }

    public getAuthenticationData(): IAuthenticationData {
        return this.auth
    }
}
