import { Repository, getRepository } from "typeorm";
import UsuarioAcesso from "../../usuarioacesso/model/UsuarioAcesso";
import Matriz from "../../matriz/model/Matriz";
import DefaultAppError from "../../../errors/DefaultAppError";
import Pessoa from "../../pessoa/model/Pessoa";
import tipoPessoa from "../../../enum/tipoPessoa";
import { hash } from 'bcryptjs'

interface IntegracaoProps {
    nome: string
    login: string
    senha: string
    tipo: string
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
        tipo,
        identificadorSistemaOrigem }: IntegracaoProps): Promise<UsuarioAcesso> {
        const matrizRepo = getRepository(Matriz)
        const matriz = await matrizRepo.findOne({
            where: { identificador_sistema_origem: identificadorSistemaOrigem }
        })

        if (!matriz) {
            throw new DefaultAppError('Matriz nao encontrada no processo de apuracao');
        }

        const pessoa = await this.vincularPessoa(nome, '')
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

    private async vincularPessoa(nome: string, tipo: string): Promise<Pessoa> {
        const pessoaRepo = getRepository(Pessoa)
        return await pessoaRepo.save(pessoaRepo.create({
            bairro: '',
            cep: '',
            cnh: '',
            complemento: '',
            cpf: '',
            email: `${nome}@binno.com`,
            estado: '',
            logradouro: '',
            municipio: '',
            numero: '',
            observacao: '',
            pais: '',
            primeiro_nome: nome,
            rg: '',
            tipo: tipoPessoa.NAO_DEFINIDO.description,
            ultimo_nome: ''
        }))
    }
}