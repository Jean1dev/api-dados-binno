import PaginatedResponse from "../../../../graphql/shared/PaginatedResponse";
import Pessoa from "../../model/Pessoa";
import {ObjectType} from "type-graphql";

@ObjectType()
export default class PaginatedPessoa extends PaginatedResponse(Pessoa) {
}