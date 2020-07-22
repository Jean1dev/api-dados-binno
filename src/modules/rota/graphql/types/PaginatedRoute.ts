import PaginatedResponse from "../../../../graphql/shared/PaginatedResponse";
import Rota from "../../model/Rota";
import {ObjectType} from "type-graphql";

@ObjectType()
export default class PaginatedRoute extends PaginatedResponse(Rota) {

}