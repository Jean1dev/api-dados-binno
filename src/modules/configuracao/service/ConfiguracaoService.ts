import { singleton, container } from "tsyringe";
import AuthenticationHolder from "../../../context/AuthenticationHolder";
import Configuracao from "../model/Configuracao";

@singleton()
export default class ConfiguracaoService {
    private authenticationHolder: AuthenticationHolder

    constructor() {
        this.authenticationHolder = container.resolve(AuthenticationHolder)
    }

    public async getDefault(): Promise<Configuracao> {
        const { matriz_id } = this.authenticationHolder.getAuthenticationData()
        let config = await Configuracao.findOne({ where: { matriz_id: matriz_id }})

        if (!config) {
            config = new Configuracao.Builder()
                .matrizId(matriz_id || 0)
                .build()
            
            await config.save()
        }

        return config
    } 
}