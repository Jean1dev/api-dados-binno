import 'reflect-metadata'
import './database/typeOrm'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import { ApolloServer } from 'apollo-server-express'
import http, { Server } from 'http'
import schema from './graphql/schema'
import Routes, { registerController } from './routes'
import { sequelizeModels } from './database/index'
import { getRepository } from 'typeorm'
import { useExpressServer } from 'routing-controllers'
import DefaultAppError from './errors/DefaultAppError'

class App {

    public express: express.Application
    public server: ApolloServer
    public httpServer: Server

    constructor() {
        this.express = express()
        this.server = new ApolloServer({
            schema: schema,
            context: this.configureGraphQlContext(),
            introspection: true, // PARA HABILITAR O PLAYGROUND EM PRODUCAO
            playground: true, // PARA HABILITAR O PLAYGROUND EM PRODUCAO
        })
        this.httpServer = http.createServer(this.express)
        this.configure()
        this.monitoringServer()
        this.routes()
        this.exceptionHandler()
        this.logs()
    }

    private configure(): void {
        this.middlewares()
        this.server.applyMiddleware({ app: this.express })
        this.server.installSubscriptionHandlers(this.httpServer)
    }
    private configureGraphQlContext(): object {
        return {
            db: sequelizeModels.models,
            transaction: sequelizeModels.transaction,
            repository: getRepository
        }
    }

    private middlewares(): void {
        this.express.use(express.json())
    }

    private monitoringServer(): void {

    }

    private routes(): void {
        this.express.use('/dados', Routes)
        this.express.use(Routes)
        useExpressServer(this.express, {
            routePrefix: '/dados',
            controllers: registerController()
        })
    }

    private exceptionHandler(): void {
        this.express.use((error: Error, request: Request, response: Response, next: NextFunction) => {
            if (error instanceof DefaultAppError ) {
                return response.status(error.statusCode).json({
                    status: 'error',
                    message: error.message
                })
            }

            console.error(error)
            return response.status(500).json({
                status: 'error',
                message: 'Internal server error'
            })
        })
    }

    private logs(): void {
        console.log(`🚀 Server ready at http://localhost:${this.server.graphqlPath}`)
        console.log(`🚀 Subscriptions ready at ws://localhost:${this.server.subscriptionsPath}`)
    }
}

export default new App().httpServer