import { createConnection } from 'typeorm'
import { PROD } from '../config/database'

const entitiesPath = process.env.NODE_ENV === 'dev' ? "./src/modules/**/model/*.ts" : "./dist/modules/**/model/*.js"
const migrationsPath = process.env.NODE_ENV === 'dev' ? './src/database/migrations/*.ts' : './dist/database/migrations/*.js'
const migrationsDir = process.env.NODE_ENV === 'dev' ? './src/database/migrations' : './dist/database/migrations'

const config: any = {
    type: 'postgres',
    host: PROD.host,
    port: 5432,
    username: PROD.username,
    password: PROD.password,
    database: PROD.database,
    entities: [ entitiesPath ],
    migrations: [],
    cli: { migrationsDir: migrationsDir },
    default: {
        type: 'postgres',
        host: PROD.host,
        port: 5432,
        username: PROD.username,
        password: PROD.password,
        database: PROD.database,
        entities: [ entitiesPath ],
        migrations: [migrationsPath],
        cli: { migrationsDir: migrationsPath }
    },
    logging: true
}


createConnection(config).then(() => {
    console.log('conectado no db', entitiesPath)
}).catch(() => {
    console.log("Couldn't connect to the database.")
});