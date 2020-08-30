import { singleton, container } from "tsyringe";
import PessoaRepository from "../repository/PessoaRepository";
import Pessoa from "../model/Pessoa";

@singleton()
export default class PessoaService {

    private repository: PessoaRepository

    constructor() {
        this.repository = container.resolve(PessoaRepository)
    }

    public async salvar(pessoa: Pessoa): Promise<Pessoa> {
        return this.repository.save(pessoa)
    }
}