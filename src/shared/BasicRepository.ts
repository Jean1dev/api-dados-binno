import { Repository, BaseEntity } from "typeorm";

export default class BasicRepository<T extends BaseEntity> {
    public repository: Repository<T>

    constructor(repository: Repository<T>) {
        this.repository = repository
    }

    public async findOne(filter: object = {}): Promise<T | undefined> {
        return this.repository.findOne({ where: filter })
    }

    public async find(limit: number, offset: number, filter: object = {}): Promise<T[]> {
       return this.repository.find({ take: limit, skip: offset, where: { filter } })
    }
}