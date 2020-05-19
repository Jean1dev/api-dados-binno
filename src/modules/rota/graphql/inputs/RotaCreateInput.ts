import { InputType, Field, Int } from "type-graphql";

@InputType()
export default class RotaCreateInput {

    @Field()
    rota_calculada: string

    @Field(() => Int)
    criado_por: number

    @Field(() => Int)
    enviado_para: number

    @Field(() => Boolean, { nullable: true })
    confimada?: boolean

    @Field({ nullable: true })
    observacoes?: string

    @Field(() => Boolean, { nullable: true })
    finalizada?: boolean
}