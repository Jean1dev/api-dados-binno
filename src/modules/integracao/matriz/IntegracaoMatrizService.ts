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
        const matriz = new Matriz.Builder()
            .identificadorSistemaOrigem(identificadorSistemaOrigem)
            .nome(nome)
            .contato(contato)
            .cnpj(cnpj)
            .telefone(contato)
            .site('')
            .build()

        await this.repository.save(matriz)

        return matriz
    }
}