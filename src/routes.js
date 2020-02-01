const express = require('express')
const RotaService = require('./controller/Rotas')

module.exports = server => {

    const router = express.Router()
    server.use('/dados', router)

    router.get('/health-status', (req, res) => res.json({STATUS: 'UP'}))
    RotaService.register(router, '/rotas')
}
