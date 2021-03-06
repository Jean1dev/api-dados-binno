import Rota from "../model/Rota";
import { getRepository } from "typeorm"
import { singleton } from "tsyringe"
import { IRotaRepository } from "./IRotaRepository";
import BasicRepository from "../../../shared/BasicRepository";
import DefaultAppError from "../../../errors/DefaultAppError";

@singleton()
export default class RotaRepository extends BasicRepository<Rota> implements IRotaRepository {

    constructor() { super(getRepository(Rota)) }

    public async onlyUpdate(id: number, updatable: object): Promise<void> {
        await this.repository.update({ id }, updatable)
    }

    public async update(data: Rota): Promise<Rota> {
        const rota = await this.repository.findOne({ where: { id: data.id } })
        
        if (!rota) {
            throw new DefaultAppError('Rota nao existe')
        }
        
        Object.assign(rota, data) // Object assing transforma o id em String ai buga o save
        rota.id = Number(rota.id)
        
        await this.repository.save(rota)
        return rota
    }

    public async delete(id: number): Promise<boolean> {
        return !!await this.repository.delete({id})
    }
}