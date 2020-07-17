import {singleton} from "tsyringe";
import BasicRepository from "../../../shared/BasicRepository";
import Roteirizacao from "../model/Roteirizacao";
import {getRepository} from "typeorm";
import {IRoteirizacaoRepository} from "./IRoteirizacaoRepository";

@singleton()
export default class RoteirizacaoRepository extends BasicRepository<Roteirizacao> implements IRoteirizacaoRepository{

    constructor() {
        super(getRepository(Roteirizacao));
    }
}