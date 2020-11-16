import BasicRepository from "../../../shared/BasicRepository"
import Matriz from "../model/Matriz"
import IMatrizRepository from "./IMatrizRepository"
import { singleton } from "tsyringe"
import { getRepository } from "typeorm"

@singleton()
export default class MatrizRepository extends BasicRepository<Matriz> implements IMatrizRepository {

    constructor() {
        super(getRepository(Matriz))
    }

    public async find(limit: number = 10, offset: number = 0, filter: any = {}): Promise<Matriz[]> {
        filter.ativo = true
        return this.repository.find({ take: limit, skip: offset, where: filter })
    }
}