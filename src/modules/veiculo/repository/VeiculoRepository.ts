import { singleton } from "tsyringe";
import IVeiculoRepository from './IVeiculoRepository'
import Veiculo from "../model/Veiculo";
import { getRepository } from "typeorm";
import BasicRepository from "../../../shared/BasicRepository";
import DefaultAppError from "../../../errors/DefaultAppError";

@singleton()
export default class VeiculoRepository extends BasicRepository<Veiculo> implements IVeiculoRepository {

    constructor() {
        super(getRepository(Veiculo))
    }
    public async encontrarEAtualizarStatusVeiculo(motorista_id: number, estaEmUso: boolean): Promise<void> {
        await this.repository.update({
            pessoa_id: motorista_id
        }, {
            veiculo_esta_sendo_utilizado_no_momento: estaEmUso
        })
    }

    public async getTotalVeiculosRodados(): Promise<number> {
        return this.repository.count({
            where: { veiculo_esta_sendo_utilizado_no_momento: true }
        })
    }

    public async getTotalVeiculosParados(): Promise<number> {
        return this.repository.count({
            where: { veiculo_esta_sendo_utilizado_no_momento: false }
        })
    }

    public async save(data: Veiculo): Promise<Veiculo> {
        const veiculo = Veiculo.create(data)
        await veiculo.save()
        return veiculo
    }

    public async update(data: Veiculo): Promise<Veiculo> {
        const veiculo = await Veiculo.findOne({ where: { id: data.id } })

        if (!veiculo) {
            throw new DefaultAppError('Veiculo nao existe')
        }

        Object.assign(veiculo, data)
        await veiculo.save()
        return veiculo
    }

    public async delete(id: number): Promise<boolean> {
        return !!this.repository.delete({ id })
    }
}