require('dotenv-extended').load()

const entitiesPath = process.env.NODE_ENV === 'dev' ? "./src/modules/**/model/*.ts" : "./dist/modules/**/model/*.js"
const migrationsPath = process.env.NODE_ENV === 'dev' ? './src/database/migrations/*.ts' : './dist/database/migrations/*.js'
const migrationsDir = process.env.NODE_ENV === 'dev' ? './src/database/migrations' : './dist/database/migrations'

module.exports = {
    type: 'postgres',
    host: process.env.HOST_DB || 'localhost',
    'port': 5432,
    username: process.env.USERNAME_DB || 'jeanfernandes',
    password: process.env.PASSWD_DB || 'admin',
    database: process.env.DB_NAME || 'binno_db',
    entities: [ entitiesPath ],
    migrations: [ migrationsPath ],
    cli: {
        'migrationsDir': migrationsDir
    },
    ssl: process.env.SSL_CONNECTION ? true : false,
    logging: process.env.NODE_ENV === 'dev'
}