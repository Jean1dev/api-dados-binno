import { createConnection } from 'typeorm'

createConnection().then(() => {
    console.log('conectado no db')
}).catch((e) => {
    console.log("Couldn't connect to the database.", e)
});