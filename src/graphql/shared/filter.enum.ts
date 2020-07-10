import { registerEnumType } from "type-graphql";

export enum Operator {
    AND,
    OR
}

export enum Operation {
    EQ,
    IN,
    LIKE,
    GE
}

registerEnumType(Operator, {
    name: 'Operator',
    description: 'operadores para filtro'
})

registerEnumType(Operation, {
    name: 'Operation',
    description: 'operacoes de busca'
})