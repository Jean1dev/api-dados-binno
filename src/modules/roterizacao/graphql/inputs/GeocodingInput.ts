import {Field, Float, InputType} from "type-graphql"

@InputType()
class GeometryInput {
    @Field(() => [[[Float]]])
    coordinates?: Array<Array<number[]>>;

    @Field(() => String)
    type?: string
}

@InputType()
class FeaturePropertiesInput {
    @Field(() => Number)
    time?: number

    @Field(() => [WaypointInput])
    waypoints?: [WaypointInput]

    @Field(() => String)
    mode?: string

    @Field(() => [LegInput])
    legs?: [LegInput]

    @Field(() => Float)
    distance?: number
}

@InputType()
class PropertiesInput {
    @Field(() => [[Float]])
    waypoints?: Array<number[]>

    @Field(() => String)
    mode?: string
}

@InputType()
class FeaturesInput {
    @Field(() => String)
    type?: string

    @Field(() => GeometryInput)
    geometry?: GeometryInput

    @Field(() => FeaturePropertiesInput)
    properties?: FeaturePropertiesInput
}

@InputType()
class WaypointInput {
    @Field(() => [Float])
    location?: [number]

    @Field(() => Number)
    original_index?: number
}

@InputType()
class LegInput {
    @Field(() => Float)
    time?: number

    @Field(() => [StepInput])
    steps?: [StepInput]

    @Field(() => Float)
    distance?: number
}

@InputType()
class InstructionInput {
    @Field(() => String)
    text?: string;
}

@InputType()
class StepInput {
    @Field(() => Float)
    time?: number

    @Field(() => Float)
    distance?: number

    @Field(() => Number)
    to_index?: number

    @Field(() => InstructionInput)
    instruction?: InstructionInput

    @Field(() => Number)
    from_index?: number
}

@InputType()
export default class GeocodingInput {
    @Field(() => String)
    type?: string

    @Field(() => [FeaturesInput])
    features?: [FeaturesInput]

    @Field(() => PropertiesInput)
    properties?: PropertiesInput
}
