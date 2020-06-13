import { buildSchema } from "type-graphql";
import { GraphQLSchema } from "graphql";
import MatrizResolver from "../modules/matriz/graphql/resolvers/MatrizResolver";
import PessoaResolver from "../modules/pessoa/graphql/resolvers/PessoaResolver";
import RotaResolver from "../modules/rota/graphql/RotaResolver";
import OrigemResolver from "../modules/origem/graphql/resolver/OrigemResolver";
import VeiculoResolver from "../modules/veiculo/graphql/resolver/VeiculoResolver";
import TotalVeiculosResolver from "../modules/veiculo/graphql/resolver/TotalVeiculosResolver";
import { customAuthChecker } from "../middlewares/customAuthCheck";

export default async function BuiltSchema(): Promise<GraphQLSchema> {
    return await buildSchema({ 
        resolvers: [
            MatrizResolver,
            PessoaResolver,
            RotaResolver,
            OrigemResolver,
            VeiculoResolver,
            TotalVeiculosResolver
        ],
        nullableByDefault: true,
        authChecker: customAuthChecker
    })
}