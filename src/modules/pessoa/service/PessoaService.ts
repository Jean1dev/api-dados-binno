import { singleton, container } from "tsyringe";
import PessoaRepository from "../repository/PessoaRepository";
import Pessoa from "../model/Pessoa";
import DefaultAppError from "../../../errors/DefaultAppError";
import MatrizRepository from "../../matriz/repository/MatrizRepository";
import UsuarioAcessoService from "../../usuarioacesso/service/UsuarioAcessoService";

@singleton()
export default class PessoaService {

    private repository: PessoaRepository
    private matrizRepository: MatrizRepository
    private usuarioService: UsuarioAcessoService

    constructor() {
        this.repository = container.resolve(PessoaRepository)
        this.matrizRepository = container.resolve(MatrizRepository)
        this.usuarioService = container.resolve(UsuarioAcessoService)
    }

    public async salvar(pessoa: Pessoa): Promise<Pessoa> {
        return this.repository.save(pessoa)
    }

    public async criarUsuarioAcesso(pessoaId: number): Promise<boolean> {
        const p = await this.repository.findOne({ id: pessoaId })

        if (!p) {
            throw new DefaultAppError('Nao existe uma pessoa para esse id')
        }

        const matriz = await this.matrizRepository.findOne({ id: p.matriz_id })

        if (!matriz) {
            throw new DefaultAppError('Nao foi encontrado matriz de origem para esse usuario')
        }

        const usuarioAcesso = await this.usuarioService.criarUsuarioAcesso({
            login: p.primeiro_nome,
            password: p.primeiro_nome,
            pessoa: p.id,
            identificadorSistemaOrigem: matriz.identificador_sistema_origem,
            matriz: matriz.id
        })
        // TODO: TRATAR QUANDO NAO FOR POSSIVEL CRIAR O USUARIO ACESSO
        await usuarioAcesso.save()
        return true
    }
}