import { Repository, getRepository } from "typeorm";
import UsuarioAcesso from "../../usuarioacesso/model/UsuarioAcesso";
import Matriz from "../../matriz/model/Matriz";
import DefaultAppError from "../../../errors/DefaultAppError";
import Pessoa from "../../pessoa/model/Pessoa";
import { hash } from 'bcryptjs'
import TipoPessoa from "../../pessoa/TipoPessoa.num";

interface IntegracaoProps {
    nome: string
    login: string
    senha: string
    email: string
    identificadorSistemaOrigem: string
}

export default class IntegracaoUsuarioService {

    private repository: Repository<UsuarioAcesso>

    constructor() {
        this.repository = getRepository(UsuarioAcesso)
    }

    public async integrar({
        nome,
        login,
        senha,
        email,
        identificadorSistemaOrigem }: IntegracaoProps): Promise<UsuarioAcesso> {
        const matrizRepo = getRepository(Matriz)
        const matriz = await matrizRepo.findOne({
            where: { identificador_sistema_origem: identificadorSistemaOrigem }
        })

        if (!matriz) {
            throw new DefaultAppError('Matriz nao encontrada no processo de apuracao');
        }

        const pessoa = await this.vincularPessoa(nome, email)
        const hashedPassword = await hash(senha, 8)

        return await this.repository.save(
            this.repository.create({
                identificador_sistema_origem: identificadorSistemaOrigem,
                login: login,
                password: hashedPassword,
                pessoa: pessoa.id,
                matriz: matriz.id,
            }))
    }

    private async vincularPessoa(nome: string, email: string): Promise<Pessoa> {
        const pessoaRepo = getRepository(Pessoa)
        return await pessoaRepo.save(pessoaRepo.create({
            bairro: '',
            cep: '',
            cnh: '',
            complemento: '',
            cpf: '',
            email: email,
            estado: '',
            logradouro: '',
            municipio: '',
            numero: '',
            observacao: '',
            pais: '',
            primeiro_nome: nome,
            rg: '',
            ultimo_nome: '',
            tipo: TipoPessoa.ADMINISTRADOR
        }))
    }
}