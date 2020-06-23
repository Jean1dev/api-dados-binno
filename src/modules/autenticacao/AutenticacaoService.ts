import UsuarioAcesso from "../usuarioacesso/model/UsuarioAcesso";
import { Repository, getRepository } from "typeorm";
import DefaultAppError from "../../errors/DefaultAppError";
import { sign } from 'jsonwebtoken'
import { compare } from "bcryptjs"
import config from '../../config/env'

interface AutenticacaoProps {
    login: string
    password: string
}

interface UsuarioComToken {
    user: UsuarioAcesso
    token: string
}

export default class AutenticacaoService {
    private repository: Repository<UsuarioAcesso>

    constructor() {
        this.repository = getRepository(UsuarioAcesso)
    }

    public async autenticar({ login, password }: AutenticacaoProps): Promise<UsuarioComToken> {
        const user = await this.repository.findOne({
            where: { login }
        })

        if (!user) {
            throw new DefaultAppError('Usuario nao existe', 401)
        }

        const passwordMatch = await compare(password, user.password)
        if (!passwordMatch) {
            throw new DefaultAppError('Credenciais incorretas', 401)
        }

        const token = sign({}, config.JWT_SECRET, {
            expiresIn: '7d',
            subject: String(user.matriz)
        })

        delete user.password
        return {
            user,
            token
        }
    }
}