import PaginatedResponse from "../../../../graphql/shared/PaginatedResponse";
import Veiculo from "../../model/Veiculo";
import {ObjectType} from "type-graphql";

@ObjectType()
export default class PaginatedVeiculo extends PaginatedResponse(Veiculo){

}