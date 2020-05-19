import * as express from 'express'
import { IntegracaoMatrizController } from './modules/integracao/matriz/IntegracaoMatrizController'
import { IntegracaoUsuarioController } from './modules/integracao/usuarioAcesso/IntegracaoUsuarioController'
import { AutenticacaoController } from './modules/autenticacao/AutenticacaoController'

const routes = express.Router()

routes.get('/health-status', (req, res) => res.json({STATUS: 'UP'}))

export default routes

export function registerController() {
    return [
        IntegracaoMatrizController,
        IntegracaoUsuarioController,
        AutenticacaoController,
    ]
}