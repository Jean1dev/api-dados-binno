const Rota = require('../schema/Rota')

async function gerarCoordenadas(coords) {

}

class RotaService {

    async save(rota) {
        await Rota.create(rota)
    }
}

module.exports = new RotaService()