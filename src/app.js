require('./database/index')
const express = require('express')
const http = require('http')
const ApolloServer = require('apollo-server-express').ApolloServer
const schema = require('./graphql/schema')
const routes = require('./routes')

class App {
    constructor() {
        this.createServer()
        this.monitoring()
        this.middlewares()
        this.routes()
        this.exceptionHandler()
        this.logs()
    }

    createServer() {
        this.app = express()
        this.server = new ApolloServer({ schema: schema })
        this.server.applyMiddleware({ app: this.app })
        this.httpServer = http.createServer(this.app)
        this.server.installSubscriptionHandlers(this.httpServer)
    }

    monitoring() { }

    middlewares() {
        this.app.use(express.json())
    }

    routes() {
        this.app.use(routes)
    }

    logs() {
        console.log(`🚀 Server ready at http://localhost:${this.server.graphqlPath}`)
        console.log(`🚀 Subscriptions ready at ws://localhost:${this.server.subscriptionsPath}`)
    }

    exceptionHandler() { }
}

module.exports = new App().httpServer