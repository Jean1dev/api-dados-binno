import { createConnection } from 'typeorm'

console.log('RODANDO EM AMBIENTE DE :', process.env.NODE_ENV)

createConnection().then(() => {
    console.log('conectado no db')
}).catch(() => {
    console.log("Couldn't connect to the database.")
});