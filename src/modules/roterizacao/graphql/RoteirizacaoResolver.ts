import {Arg, Authorized, FieldResolver, Mutation, Query, Resolver, Root} from "type-graphql";
import Roteirizacao from "../model/Roteirizacao";
import FiltersExpression from "../../../graphql/shared/FiltersExpression";
import RoteirizacaoRepository from "../repository/RoteirizacaoRepository";
import {container} from "tsyringe";
import Pessoa from "../../pessoa/model/Pessoa";
import RotaUnionRotaRascunho from "./types/rotaUnionRotaRascunho";
import SituacaoRota from "../../rota/SituacaoRota.enum";
import RoteirizacaoService from "../service/RoteirizacaoService";
import GeocodingInput from "./inputs/GeocodingInput";
import PaginatedRoteirizacao from "./types/PaginatedRoteirizacao";

@Resolver(Roteirizacao)
export default class RoteirizacaoResolver {

    private repository: RoteirizacaoRepository
    private service: RoteirizacaoService

    constructor() {
        this.repository = container.resolve(RoteirizacaoRepository)
        this.service = container.resolve(RoteirizacaoService)
    }

    @FieldResolver()
    public async pessoa_id(@Root() rota: Roteirizacao) {
        return Pessoa.findOne({where: {id: rota.pessoa_id}})
    }

    @Authorized()
    @Query(() => PaginatedRoteirizacao)
    public async roteirizacoesPaginated(
        @Arg("limit", {defaultValue: 10}) limit: number,
        @Arg("offset", {defaultValue: 0}) offset: number,
        @Arg("filters", {defaultValue: {}}) filters: FiltersExpression) {
        return this.repository.findAllAndCount(limit, offset, filters)
    }

    @Authorized()
    @Query(returns => [Roteirizacao])
    public async roteirizacoes() {
        return this.repository.findAll()
    }

    @Authorized()
    @Mutation(() => RotaUnionRotaRascunho)
    public async criarRota(
        @Arg("roteirizacaoId") roteirizacaoId: number,
        @Arg("motoristaId", {defaultValue: null}) motoristaId: number,
        @Arg("geojson") geojson: GeocodingInput,
        @Arg("situacao", type => SituacaoRota, {defaultValue: SituacaoRota.PLANEJADA}) situacao: SituacaoRota
    ) {
        const {roteirizacao, rota} = await this.service.criarRota({
            geojson,
            situacao,
            motoristaId,
            roteirizacaoId
        })

        return {roteirizacao, rota}
    }
}