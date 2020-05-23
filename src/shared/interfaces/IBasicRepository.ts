export default interface IBasicRepository<T> {
    findOne(filter: object): Promise<T | undefined>
    
    find(limit: number, offset: number, filter: object): Promise<T[]>

    save(data: T): Promise<T>

    update(data: T): Promise<T>

    delete(id: number): Promise<boolean>
}