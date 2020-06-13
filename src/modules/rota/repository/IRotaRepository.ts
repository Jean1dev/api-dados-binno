import Rota from "../model/Rota";
import IBasicRepository from "../../../shared/interfaces/IBasicRepository";

export interface IRotaRepository extends IBasicRepository<Rota> {

    onlyUpdate(id: number, updatable: object): Promise<void>
}