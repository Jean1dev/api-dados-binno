import { Repository, getRepository } from "typeorm";
import Matriz from "../../matriz/model/Matriz";

interface IntegracaoProps {
    identificadorSistemaOrigem: string
    nome: string
    contato: string
    cnpj?: string
}

export default class IntegracaoMatrizService {

    private repository: Repository<Matriz>

    constructor() {
        this.repository = getRepository(Matriz)
    }

    public async integrar({ 
        identificadorSistemaOrigem,
        nome,
        contato,
        cnpj = '' }: IntegracaoProps): Promise<Matriz> {
        const matriz = this.repository.create({
            identificador_sistema_origem: identificadorSistemaOrigem,
            nome,
            contato,
            cnpj,
            telefone: contato,
            site: ''
        })

        await this.repository.save(matriz)

        return matriz
    }
}