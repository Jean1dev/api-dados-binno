class BasicRepository {

    constructor(sequelizeModel) {
        this.model = sequelizeModel
    }

    async save(entity) {
        return await this.model.create(entity)
    }

    async findById(id) {
        return await this.model.findByPk(id)
    }

    async findAll(where) {
        return await this.model.find(where)
    }

    async findByIdAndUpdate(id, updatable) {
        return await this.model.findByIdAndUpdate(id, updatable)
    }

    async findOne(where) {
        return await this.model.findOne(where)
    }
}

module.exports = BasicRepository