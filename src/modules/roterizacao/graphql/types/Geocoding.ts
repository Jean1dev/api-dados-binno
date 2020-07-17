import {Field, Float, ObjectType} from "type-graphql"

@ObjectType()
class Geometry {
    @Field(() => [[[Float]]])
    coordinates: Array<Array<number[]>>;

    @Field(() => String)
    type: string
}

@ObjectType()
class FeatureProperties {
    @Field(() => Number)
    time: number

    @Field(() => [Waypoint])
    waypoints: [Waypoint]

    @Field(() => String)
    mode: string

    @Field(() => [Leg])
    legs: [Leg]

    @Field(() => Float)
    distance: number
}

@ObjectType()
class Properties {
    @Field(() => [[Float]])
    waypoints: Array<number[]>

    @Field(() => String)
    mode: string
}

@ObjectType()
class Features {
    @Field(() => String)
    type: string

    @Field(() => Geometry)
    geometry: Geometry

    @Field(() => FeatureProperties)
    properties: FeatureProperties
}

@ObjectType()
class Waypoint {
    @Field(() => [Float])
    location: [number]

    @Field(() => Number)
    original_index: number
}

@ObjectType()
class Leg {
    @Field(() => Float)
    time: number

    @Field(() => [Step])
    steps: [Step]

    @Field(() => Float)
    distance: number
}

@ObjectType()
class Instruction {
    @Field(() => String)
    text: string;
}

@ObjectType()
class Step {
    @Field(() => Float)
    time: number

    @Field(() => Float)
    distance: number

    @Field(() => Number)
    to_index: number

    @Field(() => Instruction)
    instruction: Instruction

    @Field(() => Number)
    from_index: number
}

@ObjectType()
export default class Geocoding {
    @Field(() => String)
    type: string

    @Field(() => [Features])
    features: [Features]

    @Field(() => Properties)
    properties: Properties
}
