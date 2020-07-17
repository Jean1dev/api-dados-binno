import {Field, ObjectType} from "type-graphql";
import Rota from "../../../rota/model/Rota";
import Roteirizacao from "../../model/Roteirizacao";

@ObjectType()
export default class RotaUnionRotaRascunho {
    @Field(returns => Rota)
    rota: Rota

    @Field(returns => Roteirizacao)
    roteirizacao: Roteirizacao
}