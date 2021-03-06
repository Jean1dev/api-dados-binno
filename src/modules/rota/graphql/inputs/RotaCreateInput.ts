import { InputType, Field, Int } from "type-graphql";
import SituacaoRota from "../../SituacaoRota.enum";
import TipoRota from "../../TipoRota.enum";

@InputType()
export default class RotaCreateInput {

    @Field()
    rota_calculada: string

    @Field({ nullable: true })
    nome?: string

    @Field(() => Int)
    criado_por: number

    @Field(() => Int, { nullable: true })
    enviado_para: number

    @Field(() => Boolean, { nullable: true })
    confimada?: boolean

    @Field({ nullable: true })
    observacoes?: string

    @Field(() => Boolean, { nullable: true })
    finalizada?: boolean

    @Field(type => SituacaoRota, { defaultValue: SituacaoRota.PLANEJADA })
    situacao_rota: SituacaoRota

    @Field(type => TipoRota, { defaultValue: TipoRota.SEM_TIPO })
    tipo: TipoRota
}