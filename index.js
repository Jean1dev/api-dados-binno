const app = require('./src/app')
const port = process.env.APPLICATION_PORT || 8082

app.listen(port, () => {
    console.log('api-dados on ', port)
})