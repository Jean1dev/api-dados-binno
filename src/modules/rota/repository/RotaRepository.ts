import Rota from "../model/Rota";
import { getRepository, Repository } from "typeorm"
import { singleton } from "tsyringe"
import { IRotaRepository } from "./IRotaRepository";
import BasicRepository from "../../../shared/BasicRepository";
import DefaultAppError from "../../../errors/DefaultAppError";

@singleton()
export default class RotaRepository extends BasicRepository<Rota> implements IRotaRepository {

    constructor() {
        super(getRepository(Rota))
    }

    public async save(data: Rota): Promise<Rota> {
        const rota = Rota.create(data)
        await rota.save()
        return rota
    }

    public async update(data: Rota): Promise<Rota> {
        const rota = await Rota.findOne({ where: { id: data.id } })

        if (!rota) {
            throw new DefaultAppError('Rota nao existe')
        }

        Object.assign(rota, data)
        await rota.save()
        return rota
    }

    public async delete(id: number): Promise<boolean> {
        return !!this.repository.delete({ id })
    }
    
}