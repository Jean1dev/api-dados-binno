import { createConnection } from 'typeorm'
import { PROD } from '../config/database'

const entitiesPath = process.env.NODE_ENV === 'dev' ? './src/model/typemodels/*.ts' : './dist/model/typemodels/*.js'
const config: any = {
    type: 'postgres',
    host: PROD.host,
    port: 5432,
    username: PROD.username,
    password: PROD.password,
    database: PROD.database,
    entities: [ entitiesPath ],
    migrations: ['./src/database/migrations/*.ts'],
    cli: { migrationsDir: './src/database/migrations' },
    default: {
        type: 'postgres',
        host: PROD.host,
        port: 5432,
        username: PROD.username,
        password: PROD.password,
        database: PROD.database,
        entities: [ entitiesPath ],
        migrations: ['./src/database/migrations/*.ts'],
        cli: { migrationsDir: './src/database/migrations' }
    }
}


createConnection(config).then(() => {
    console.log('conectado no db', entitiesPath)
}).catch(() => {
    console.log("Couldn't connect to the database.")
});