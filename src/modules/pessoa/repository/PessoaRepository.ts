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

        Object.assign(pessoa, data) // Object assing transforma o id em String ai buga o save
        pessoa.id = Number(pessoa.id)
        await pessoa.save()
        return pessoa
    }
}