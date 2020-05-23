import { singleton } from "tsyringe";
import BasicRepository from "../../../shared/BasicRepository";
import Origem from "../model/Origem";
import { IOrigemRepository } from "./IOrigemRepository";
import { getRepository } from "typeorm";
import DefaultAppError from "../../../errors/DefaultAppError";

@singleton()
export default class OrigemRepository extends BasicRepository<Origem> implements IOrigemRepository {

    constructor() {
        super(getRepository(Origem))
    }

    public async save(data: Origem): Promise<Origem> {
        const origem = Origem.create(data)
        await origem.save()
        return origem
    }

    public async update(data: Origem): Promise<Origem> {
        const origem = await Origem.findOne({ where: { id: data.id } })

        if (!origem) {
            throw new DefaultAppError('Origem nao existe')
        }

        Object.assign(origem, data)
        await origem.save()
        return origem
    }

    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}