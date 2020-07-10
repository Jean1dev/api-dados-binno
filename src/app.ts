import 'reflect-metadata'
import './database/typeOrm'
import express, { Request } from 'express'
import 'express-async-errors'
import { ApolloServer } from 'apollo-server-express'
import http, { Server } from 'http'
import Routes, { registerController } from './routes'
import { useExpressServer } from 'routing-controllers'
import BuildSchema from './graphql/builtSchema'
import { errorHandler } from './errors/CustomExpressErrorHandler'
import * as Sentry from '@sentry/node';
require('appmetrics-dash').attach()

class App {

    private port: number = 8082
    private express: express.Application
    private server: ApolloServer
    public httpServer: Server

    constructor() {
        this.express = express()
    }

    public start(port: number = 8082): void {
        this.port = port
        this.httpServer.listen(port, () => {
            console.log('api-dados on ', port)
            this.logs()
        })
    }

    public async configure(): Promise<void> {
        this.monitoringServer()
        const schema = await BuildSchema()
        this.server = new ApolloServer({
            schema: schema,
            context: this.configureGraphQlContext(),
            introspection: true, // PARA HABILITAR O PLAYGROUND EM PRODUCAO
            playground: true, // PARA HABILITAR O PLAYGROUND EM PRODUCAO
        })
        this.httpServer = http.createServer(this.express)
        this.middlewares()
        this.routes()
        this.exceptionHandler()
        this.server.applyMiddleware({ app: this.express })
        this.server.installSubscriptionHandlers(this.httpServer)
    }

    private configureGraphQlContext(): Function {
        return (req: Request) => {
            const context = {
                request: req,
                user: 'req.user', // `req.user` comes from `express-jwt`
            };

            return context;
        }
    }

    private middlewares(): void {
        this.express.use(Sentry.Handlers.requestHandler())
        this.express.use(express.json())
    }

    private monitoringServer(): void {
        Sentry.init({ dsn: 'https://f91ad114a17d468ca8ff8e964e1be43f@o318666.ingest.sentry.io/5267522' });
    }

    private routes(): void {
        this.express.use('/dados', Routes)
        this.express.use(Routes)
        useExpressServer(this.express, {
            routePrefix: '/dados',
            controllers: registerController(),
            defaultErrorHandler: false
        })
    }

    private exceptionHandler(): void {
        this.express.use(Sentry.Handlers.errorHandler())
        this.express.use(errorHandler)
    }

    public logs(): void {
        console.log(`🚀 Server ready at http://localhost:${this.port}${this.server.graphqlPath}`)
        console.log(`🚀 Subscriptions ready at ws://localhost:${this.port}${this.server.subscriptionsPath}`)
        console.log(`🚀 Monitoring api in http://localhost:${this.port}/appmetrics-dash`)
    }
}

export default new App()