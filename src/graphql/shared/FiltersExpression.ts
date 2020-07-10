import { InputType, Field } from "type-graphql";
import { Operator } from "./filter.enum";
import Filter from "./Filter";

@InputType()
export default class FiltersExpression {

    @Field(type => Operator)
    operator: Operator

    @Field(type => [ Filter ])
    filters: [ Filter ]

    @Field(type => [ FiltersExpression ])
    childExpressions: [ FiltersExpression ]
}