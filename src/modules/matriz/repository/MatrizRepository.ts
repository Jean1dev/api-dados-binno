import BasicRepository from "../../../shared/BasicRepository";
import Matriz from "../model/Matriz";
import IMatrizRepository from "./IMatrizRepository";
import { singleton } from "tsyringe";
import { getRepository } from "typeorm";

@singleton()
export default class MatrizRepository extends BasicRepository<Matriz> implements IMatrizRepository {

    constructor() {
        super(getRepository(Matriz))
    }
    
    save(data: Matriz): Promise<Matriz> {
        throw new Error("Method not implemented.");
    }
    update(data: Matriz): Promise<Matriz> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}