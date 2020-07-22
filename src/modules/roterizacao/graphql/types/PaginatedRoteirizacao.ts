import PaginatedResponse from "../../../../graphql/shared/PaginatedResponse";
import Roteirizacao from "../../model/Roteirizacao";
import {ObjectType} from "type-graphql";

@ObjectType()
export default class PaginatedRoteirizacao extends PaginatedResponse(Roteirizacao){

}