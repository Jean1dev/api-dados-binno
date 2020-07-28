import {Repository, BaseEntity, DeepPartial, SelectQueryBuilder, getRepository} from "typeorm";
import AuthenticationHolder from "../context/AuthenticationHolder";
import {container} from "tsyringe";
import {isNececessaryBuiltFilter} from "./functions";
import FilterQueryBuilder from "./FilterQueryBuilder";
import {IConsultaDadosComTotais} from "./interfaces/IConsultaDadosComTotais";

export default class BasicRepository<T extends DeepPartial<BaseEntity>> {
    public repository: Repository<T>
    protected authenticationHolder: AuthenticationHolder

    constructor(repository: Repository<T>) {
        this.repository = repository
        this.authenticationHolder = container.resolve(AuthenticationHolder)
    }

    public async findOne(filter: object = {}): Promise<T | undefined> {
        return this.repository.findOne({where: filter})
    }

    public async findAll(): Promise<T[]> {
        const {matriz_id} = this.authenticationHolder.getAuthenticationData()
        return this.repository.find({where: {matriz_id}})
    }

    public async find(limit: number = 10, offset: number = 0, filter: any = {}): Promise<T[]> {
        const {matriz_id} = this.authenticationHolder.getAuthenticationData()
        if (!isNececessaryBuiltFilter(filter)) {
            filter.matriz_id = matriz_id
            return this.repository.find({take: limit, skip: offset, where: filter})
        }

        return new FilterQueryBuilder<T>(this.repository, filter)
            .build()
            .andWhere(`matriz_id = ${matriz_id}`)
            .limit(limit)
            .offset(offset)
            .getMany()
    }

    public async findAllAndCount(limit: number = 10, offset: number = 0, filter: any = {}, selection?: string[]): Promise<IConsultaDadosComTotais<T>> {
        const {matriz_id} = this.authenticationHolder.getAuthenticationData()
        if (!isNececessaryBuiltFilter(filter)) {
            filter.matriz_id = matriz_id
            const total = await this.getTotal(matriz_id)
            const result = await this.repository.find({
                // @ts-ignore
                take: limit,
                skip: offset,
                where: filter,
                select: selection,
                order: {
                    'id': "ASC"
                }
            })

            return {
                items: result,
                total
            }
        }

        const total = await new FilterQueryBuilder<T>(this.repository, filter)
            .build()
            .andWhere(`matriz_id = ${matriz_id}`)
            .getCount()

        const result = await new FilterQueryBuilder<T>(this.repository, filter)
            .build()
            .andWhere(`matriz_id = ${matriz_id}`)
            .limit(limit)
            .offset(offset)
            .orderBy('id', "ASC")
            .getMany()

        return {
            items: result,
            total
        }
    }

    public async save(entity: any): Promise<T> {
        const {matriz_id} = this.authenticationHolder.getAuthenticationData()
        entity.matriz_id = matriz_id
        return this.repository.save(entity)
    }

    delete(id: number): Promise<boolean> {
        throw new Error('metodo nao sobrescrito')
    }

    update(data: T): Promise<T> {
        throw new Error('metodo nao sobrescrito')
    }

    private async getTotal(matriz_id: number | undefined) {
        return this.repository.count({where: {matriz_id: matriz_id}})
    }
}