import IEnvironmentMap from 'dotenv-extended'
IEnvironmentMap.load()
import Application from './app'

const port = process.env.PORT || 8082

async function start() {
    await Application.configure()

    Application.httpServer.listen(port, () => {
        console.log('api-dados on ', port)
        Application.logs()
    })
}

start()
