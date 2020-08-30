import { singleton, container } from "tsyringe";
import { hash } from 'bcryptjs'
import UsuarioAcesso from "../model/UsuarioAcesso";
import Pessoa from "../../pessoa/model/Pessoa";
import Matriz from "../../matriz/model/Matriz";
import DefaultAppError from "../../../errors/DefaultAppError";
import AuthenticationHolder from "../../../context/AuthenticationHolder";

interface UsuarioAcessoProps {
    login: string
    password: string
    identificadorSistemaOrigem: string
    pessoa: number
    matriz: number
}

@singleton()
export default class UsuarioAcessoService {
    private holder: AuthenticationHolder

    constructor() {
        this.holder = container.resolve(AuthenticationHolder)
    }

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

    public async getMyUsers() {
        const { matriz_id } = this.holder.getAuthenticationData()
        return UsuarioAcesso.find({ where: { matriz: matriz_id }})
    }

    public async criar(pessoaId: number, login: string, password: string): Promise<boolean> {
        const p = await Pessoa.findOne({ id: pessoaId })

        if (!p) {
            throw new DefaultAppError('Nao existe uma pessoa para esse id')
        }

        const matriz = await Matriz.findOne({ id: p.matriz_id })

        if (!matriz) {
            throw new DefaultAppError('Nao foi encontrado matriz de origem para esse usuario')
        }

        const usuarioAcesso = await this.criarUsuarioAcesso({
            login: login,
            password: password,
            pessoa: p.id,
            identificadorSistemaOrigem: matriz.identificador_sistema_origem,
            matriz: matriz.id
        })
        // TODO: TRATAR QUANDO NAO FOR POSSIVEL CRIAR O USUARIO ACESSO
        await usuarioAcesso.save()
        return true
    }
}