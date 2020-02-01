const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const mongoUrl = process.env.MONGO_URL || 'mongodb+srv://default:default@cluster0-e7nlh.mongodb.net/test?retryWrites=true&w=majority'

module.exports = mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
