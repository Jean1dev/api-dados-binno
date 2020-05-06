const fs = require('fs')
const path = require('path')
const postgresConfig = require('../config/database')
const Sequelize = require('sequelize')
const mongoose = require('mongoose')
const mongoUrl = process.env.MONGO_URL

class Database {
    constructor() {
        this.pg()
        this.mongo()
    }

    pg() {
        this.connection = new Sequelize(postgresConfig.PROD)
        let pathModels = path.resolve(__dirname, '..', 'model')

        const models = fs.readdirSync(pathModels).filter(file => {
            const fileSlice = file.slice(-2)
            return (file.indexOf('.') !== 0) && (fileSlice === 'js') || (fileSlice === 'ts')
        })

        models.forEach(m => {
            let o = require(path.join(pathModels, m))
            o.init(this.connection)
            if (o.associate) {
                o.associate(this.connection.models)
            }
        }, this)
    }

    mongo() {
        this.mongoConnection = mongoose.connect(
            mongoUrl,
            {
                useNewUrlParser: true,
                useFindAndModify: true,
                useUnifiedTopology: true
            }
        )
    }
}

module.exports = {
    singleton: new Database(),
    sequelizeModels: new Database().connection
}