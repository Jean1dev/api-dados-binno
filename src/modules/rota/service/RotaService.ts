import {singleton, container} from "tsyringe";
import RotaRepository from "../repository/RotaRepository";
import DefaultAppError from "../../../errors/DefaultAppError";
import Rota from "../model/Rota";
import VeiculoRepository from "../../veiculo/repository/VeiculoRepository";

@singleton()
export default class RotaService {

    private repository: RotaRepository
    private veiculoRepository: VeiculoRepository

    constructor() {
        this.repository = container.resolve(RotaRepository)
        this.veiculoRepository = container.resolve(VeiculoRepository)
    }

    public async confirmarRota(idRota: number): Promise<Rota> {
        const rota = await this.repository.findOne({id: idRota})
        if (!rota) {
            throw new DefaultAppError('Rota nao existe')
        }

        await this.repository.onlyUpdate(idRota, {confimada: true})
        await this.veiculoRepository.encontrarEAtualizarStatusVeiculo(rota.enviado_para, true)
        return rota
    }

    public async atualizarRota(data: Rota): Promise<Rota> {
        const rota = await this.repository.update(data)

        if (rota.confimada && !rota.finalizada) {
            await this.veiculoRepository.encontrarEAtualizarStatusVeiculo(rota.enviado_para, true)
        } else if (rota.finalizada) {
            await this.veiculoRepository.encontrarEAtualizarStatusVeiculo(rota.enviado_para, false)
        }
        return rota
    }
}