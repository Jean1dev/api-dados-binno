import { singleton } from "tsyringe";
import { hash } from 'bcryptjs'
import UsuarioAcesso from "../model/UsuarioAcesso";

interface UsuarioAcessoProps {
    login: string
    password: string
    identificadorSistemaOrigem: string
    pessoa: number
    matriz: number
}

@singleton()
export default class UsuarioAcessoService {

    public async criarUsuarioAcesso({
        login,
        identificadorSistemaOrigem,
        matriz,
        password,
        pessoa
    }: UsuarioAcessoProps): Promise<UsuarioAcesso> {
        const hashedPassword = await hash(password, 8)
        return new UsuarioAcesso.Builder()
            .login(login)
            .password(hashedPassword)
            .identificadorSistemaOrigem(identificadorSistemaOrigem)
            .matriz(matriz)
            .pessoa(pessoa)
            .build()
    }
}