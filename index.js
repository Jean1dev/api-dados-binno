require('dotenv-extended').load()
const app = require('./src/app')
const port = process.env.PORT || 8082

app.listen(port, () => {
    console.log('api-dados on ', port)
})