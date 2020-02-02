require('./database/index')
const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./graphql/schema')
const routes = require('./routes')

class App {
    constructor() {
        this.server = express()
        this.monitoring()
        this.middlewares()
        this.routes()
        this.exceptionHandler()
    }

    monitoring() { }

    middlewares() {
        this.server.use(express.json())
    }

    routes() { 
        this.server.use('/graphql', graphqlHTTP((req) => ({
            schema: schema,
            graphiql: true
        })))

        this.server.use(routes)
    }

    exceptionHandler() { }
}

module.exports = new App().server