import { InputType, Field } from "type-graphql";
import { Operation, Operator } from "./filter.enum";

@InputType()
export default class Filter {

    @Field(type => Operation)
    op: Operation

    @Field(type => [String])
    values: [string]

    @Field()
    field: string

    @Field()
    relationField: string
}