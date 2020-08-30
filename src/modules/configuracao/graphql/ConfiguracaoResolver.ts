import Configuracao from "../model/Configuracao";
import { Resolver, Query, Authorized, FieldResolver, Root } from "type-graphql";
import ConfiguracaoService from "../service/ConfiguracaoService";
import { container } from "tsyringe";
import Pessoa from "../../pessoa/model/Pessoa";

@Resolver(Configuracao)
export default class ConfiguracaoResolver {

    private service: ConfiguracaoService

    constructor() {
        this.service = container.resolve(ConfiguracaoService)
    }

    @Authorized()
    @Query(returns => Configuracao)
    public async configuracaoPadrao() {
        return this.service.getDefault()
    }

    @FieldResolver()
    public async motorista_padrao(@Root() config: Configuracao) {
        return Pessoa.findOne({ where: { id: config.motorista_padrao } })
    }
}