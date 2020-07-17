import { buildSchema } from "type-graphql";
import { GraphQLSchema } from "graphql";
import MatrizResolver from "../modules/matriz/graphql/resolvers/MatrizResolver";
import PessoaResolver from "../modules/pessoa/graphql/resolvers/PessoaResolver";
import RotaResolver from "../modules/rota/graphql/RotaResolver";
import VeiculoResolver from "../modules/veiculo/graphql/resolver/VeiculoResolver";
import TotalVeiculosResolver from "../modules/veiculo/graphql/resolver/TotalVeiculosResolver";
import { customAuthChecker } from "../middlewares/customAuthCheck";
import RoteirizacaoResolver from "../modules/roterizacao/graphql/RoteirizacaoResolver";

export default async function BuiltSchema(): Promise<GraphQLSchema> {
    return await buildSchema({ 
        resolvers: [
            MatrizResolver,
            PessoaResolver,
            RotaResolver,
            VeiculoResolver,
            TotalVeiculosResolver,
            RoteirizacaoResolver
        ],
        nullableByDefault: true,
        authChecker: customAuthChecker
    })
}