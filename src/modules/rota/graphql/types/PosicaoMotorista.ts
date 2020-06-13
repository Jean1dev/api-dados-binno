import { ObjectType, Field, Int, Float, InputType } from "type-graphql";

@InputType()
export class PosicaoMotoristaInput {

    @Field(() => Int)
    id_rota: number

    @Field(() => Float)
    accuracy: number

    @Field(() => Float)
    altitude: number

    @Field(() => Float)
    latitude: number

    @Field(() => Float)
    longitude: number

    @Field(() => Float)
    speed: number
}

@ObjectType()
export default class PosicaoMotorista {

    @Field(() => Int)
    id_rota: number

    @Field(() => Float)
    accuracy: number

    @Field(() => Float)
    altitude: number

    @Field(() => Float)
    latitude: number

    @Field(() => Float)
    longitude: number

    @Field(() => Float)
    speed: number
}