import {ClassType, Field, Int, ObjectType} from "type-graphql";

export default function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>) {
    @ObjectType({isAbstract: true})
    abstract class PaginatedResponseClass {
        @Field(type => [TItemClass])
        items: TItem[]

        @Field(returns => Int)
        total: number
    }

    return PaginatedResponseClass
}