import IBasicRepository from '../../../shared/interfaces/IBasicRepository'
import Veiculo from '../model/Veiculo'

export default interface IVeiculoRepository extends IBasicRepository<Veiculo> {
    getTotalVeiculosRodados(): Promise<number>
    getTotalVeiculosParados(): Promise<number>
}