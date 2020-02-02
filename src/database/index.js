const mongoose = require('mongoose')
const mongoUrl = process.env.MONGO_URL || 'mongodb+srv://default:default@cluster0-e7nlh.mongodb.net/test?retryWrites=true&w=majority'

class Database {
    constructor() {
        this.mongo()
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

module.exports = new Database()