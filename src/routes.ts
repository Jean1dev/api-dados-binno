import * as express from 'express'
import { IntegracaoMatrizController } from './integracao/matriz/IntegracaoMatrizController'
import { IntegracaoUsuarioController } from './integracao/usuarioAcesso/IntegracaoUsuarioController'
import { AutenticacaoController } from './controller/AutenticacaoController'

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