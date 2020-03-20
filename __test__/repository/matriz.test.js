const app = require('../../src/app')
const Matriz = require('../../src/repository/Matriz')

describe('CRUD test Matriz', () => {
    it('deve Salvar uma matriz', async () => {
        const matriz = {
            cnpj: `cnpj`,
            telefone: `telefone`,
            site: `site`,
            contato: `contato`,
        }

        const result = await Matriz.save(matriz)
        expect(result).not.toBeNull()
        expect(result.cnpj).toBe('cnpj')
    })

})