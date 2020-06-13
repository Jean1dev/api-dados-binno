import { singleton, container } from "tsyringe";
import GeolocalizacaoClient from "../../../shared/RestClient/GeolocalizacaoClient";
import RotaRepository from "../repository/RotaRepository";
import DefaultAppError from "../../../errors/DefaultAppError";
import Rota from "../model/Rota";
import VeiculoRepository from "../../veiculo/repository/VeiculoRepository";

@singleton()
export default class RotaService {

    private geolocalizacaoClient: GeolocalizacaoClient
    private repository: RotaRepository
    private veiculoRepository: VeiculoRepository

    constructor() {
        this.geolocalizacaoClient = container.resolve(GeolocalizacaoClient)
        this.repository = container.resolve(RotaRepository)
        this.veiculoRepository = container.resolve(VeiculoRepository)
    }

    public async consultarRotaCalculada(idRota: string): Promise<string> {
        const { data } = await this.geolocalizacaoClient.consultarRotaCalculada(idRota)
        return JSON.stringify(data)
    }

    public async confirmarRota(idRota: number): Promise<Rota> {
        const rota = await this.repository.findOne({ id: idRota })
        if (!rota) {
            throw new DefaultAppError('Rota nao existe')
        }

        await this.repository.onlyUpdate(idRota, { confimada: true })
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