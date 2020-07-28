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
    public async encontrarEAtualizarStatusVeiculo(motorista_id: number | undefined, estaEmUso: boolean): Promise<void> {
        if (!motorista_id) {
            return
        }

        await this.repository.update({
            pessoa_id: motorista_id
        }, {
            veiculo_esta_sendo_utilizado_no_momento: estaEmUso
        })
    }

    public async getTotalVeiculosRodados(): Promise<number> {
        const {matriz_id} = this.authenticationHolder.getAuthenticationData();
        return this.repository.count({
            where: { veiculo_esta_sendo_utilizado_no_momento: true, matriz_id }
        })
    }

    public async getTotalVeiculosParados(): Promise<number> {
        const {matriz_id} = this.authenticationHolder.getAuthenticationData();
        return this.repository.count({
            where: { veiculo_esta_sendo_utilizado_no_momento: false, matriz_id }
        })
    }

    public async save(data: Veiculo): Promise<Veiculo> {
        const veiculo = Veiculo.create(data)
        return super.save(veiculo)
    }

    public async update(data: Veiculo): Promise<Veiculo> {
        const veiculo = await Veiculo.findOne({ where: { id: data.id } })

        if (!veiculo) {
            throw new DefaultAppError('Veiculo nao existe')
        }

        Object.assign(veiculo, data)// Object assing transforma o id em String ai buga o save
        veiculo.id = Number(veiculo.id)
        await veiculo.save()
        return veiculo
    }

    public async delete(id: number): Promise<boolean> {
        return !!await this.repository.delete({id})
    }
}