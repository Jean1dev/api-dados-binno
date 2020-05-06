import IEnvironmentMap from 'dotenv-extended'
IEnvironmentMap.load()

import Application from './app'

const port = process.env.PORT || 8082

Application.listen(port, () => {
    console.log('api-dados on ', port)
})