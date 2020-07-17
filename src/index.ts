import IEnvironmentMap from 'dotenv-extended'
IEnvironmentMap.load()
import Application from './app'

console.log('RODANDO EM AMBIENTE DE :', process.env.NODE_ENV)
const port = process.env.PORT || 8082

async function start() {
    await Application.configure()

    Application.httpServer.listen(port, () => {
        console.log('api-dados on ', port)
        Application.logs()
    })
}

start()
