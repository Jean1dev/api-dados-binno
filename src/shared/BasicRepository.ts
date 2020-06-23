import { Repository, BaseEntity, DeepPartial } from "typeorm";
import AuthenticationHolder from "../context/AuthenticationHolder";
import { container } from "tsyringe";

export default class BasicRepository<T extends DeepPartial<BaseEntity>> {
    public repository: Repository<T>
    private authenticationHolder: AuthenticationHolder

    constructor(repository: Repository<T>) {
        this.repository = repository
        this.authenticationHolder = container.resolve(AuthenticationHolder)
    }

    public async findOne(filter: object = {}): Promise<T | undefined> {
        return this.repository.findOne({ where: filter })
    }

    public async find(limit: number = 10, offset: number = 0, filter: any = {}): Promise<T[]> {
        const { matriz_id } = this.authenticationHolder.getAuthenticationData()
        filter.matriz_id = matriz_id
        return this.repository.find({ take: limit, skip: offset, where: filter })
    }

    public async save(entity: any): Promise<T> {
        const { matriz_id } = this.authenticationHolder.getAuthenticationData()
        entity.matriz_id = matriz_id
        return this.repository.save(entity)
    }
}