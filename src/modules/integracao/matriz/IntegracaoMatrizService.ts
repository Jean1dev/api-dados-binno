import { Repository, getRepository } from "typeorm";
import Matriz from "../../matriz/model/Matriz";
import UsuarioAcesso from "../../usuarioacesso/model/UsuarioAcesso";
import Pessoa from "../../pessoa/model/Pessoa";

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

    public async inativarMatriz(idBinno: number, idSistemaIterno: string) {
        const matriz = await Matriz.findOne({
            where: {
                id: idBinno, identificador_sistema_origem: idSistemaIterno, ativo: true
            }
        })

        if (matriz instanceof Matriz) {
            await this.encontrarEInativarUsuarios(matriz.id)
            matriz.ativo = false
            await matriz.save()
        }
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

    private async encontrarEInativarUsuarios(id: number) {
        const usuarios = await UsuarioAcesso.find({ where: { matriz: id } })
        usuarios.forEach(async usuario => {
            usuario.ativo = false
            await usuario.save()
            await Pessoa.update({ id: usuario.pessoa }, { ativo: false })
        })
    }
}