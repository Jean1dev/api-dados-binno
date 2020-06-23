import { singleton } from "tsyringe";
import BasicRepository from "../../../shared/BasicRepository";
import Pessoa from "../model/Pessoa";
import IPessoaRepository from "./IPessoaRepository";
import { getRepository } from "typeorm";
import DefaultAppError from "../../../errors/DefaultAppError";

@singleton()
export default class PessoaRepository extends BasicRepository<Pessoa> implements IPessoaRepository {

    constructor() {
        super(getRepository(Pessoa))
    }

    public async save(data: Pessoa): Promise<Pessoa> {
        const pessoa = Pessoa.create(data)
        await super.save(pessoa)
        return pessoa
    }

    public async update(data: Pessoa): Promise<Pessoa> {
        const pessoa = await Pessoa.findOne({ where: { id: data.id } })

        if (!pessoa) {
            throw new DefaultAppError('Usuario nao existe')
        }

        Object.assign(pessoa, data)
        await pessoa.save()
        return pessoa
    }

    delete(id: number): Promise<boolean> {
        throw new Error("Pessoa nao pode ser deletada.");
    }

}