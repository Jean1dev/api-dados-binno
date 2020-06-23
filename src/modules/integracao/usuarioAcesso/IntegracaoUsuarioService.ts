import { Repository, getRepository } from "typeorm";
import UsuarioAcesso from "../../usuarioacesso/model/UsuarioAcesso";
import Matriz from "../../matriz/model/Matriz";
import DefaultAppError from "../../../errors/DefaultAppError";
import Pessoa from "../../pessoa/model/Pessoa";
import TipoPessoa from "../../pessoa/TipoPessoa.num";
import UsuarioAcessoService from "../../usuarioacesso/service/UsuarioAcessoService";
import { container } from "tsyringe";

interface IntegracaoProps {
    nome: string
    login: string
    senha: string
    email: string
    identificadorSistemaOrigem: string
}

export default class IntegracaoUsuarioService {

    private repository: Repository<UsuarioAcesso>
    private usuarioService: UsuarioAcessoService

    constructor() {
        this.repository = getRepository(UsuarioAcesso)
        this.usuarioService = container.resolve(UsuarioAcessoService)
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

        const pessoa = await this.vincularPessoa(nome, email, matriz.id)
        const usuarioAcesso = await this.usuarioService.criarUsuarioAcesso({
            identificadorSistemaOrigem,
            login,
            password: senha,
            matriz: matriz.id,
            pessoa: pessoa.id
        })

        return await this.repository.save(usuarioAcesso)
    }

    private async vincularPessoa(nome: string, email: string, matrizId: number): Promise<Pessoa> {
        const pessoaRepo = getRepository(Pessoa)
        const pessoa = new Pessoa.Builder()
            .bairro('')
            .cep('')
            .cnh('')
            .complemento('')
            .email(email)
            .estado('')
            .logradouro('')
            .numero('')
            .observacao('')
            .pais('')
            .primeiro_nome(nome)
            .rg('')
            .ultimo_nome('')
            .tipo(TipoPessoa.ADMINISTRADOR)
            .matriz_id(matrizId)
            .build()

        return await pessoaRepo.save(pessoa)
    }
}