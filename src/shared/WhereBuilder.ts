import { BaseEntity, SelectQueryBuilder } from "typeorm";
import FiltersExpression from "../graphql/shared/FiltersExpression";
import Filter from "../graphql/shared/Filter";
import { Operation } from "../graphql/shared/filter.enum";
import DefaultAppError from "../errors/DefaultAppError";
import { isEmpty } from "./functions";

type ParamValue = string | number | Array<string|number>

export default class WhereBuilder<T> {

    private params: Record<string, ParamValue> = {}
    private paramsCount = 0

    constructor(
        private readonly queryBuilder: SelectQueryBuilder<T>,
        private filtersExpression?: FiltersExpression) {}

    public build() {
        if (!this.filtersExpression) {
            return
        }

        const where = this.buildExpressionRec(this.filtersExpression)
        this.queryBuilder.where(where, this.params)
    }

    private buildExpressionRec(filters: FiltersExpression): string {
        const filtersBuild = filters.filters.map(f => this.buildFilter(f))
        let children = filters.childExpressions?.map(child => this.buildExpressionRec(child))

        if (!children) children = []

        const allSqlBlocks = [ ...filtersBuild, ...children ]
        const sqlExpression = allSqlBlocks.join(`${filters.operator}`)
        return isEmpty(sqlExpression) ? '' : `(${sqlExpression})`
    }

    private buildFilter(filter: Filter): string {
        const paramName = `${filter.field}_${++this.paramsCount}`

        switch(filter.op) {
            case Operation.EQ:
                this.params[paramName] = filter.values[0]
                return `${filter.field} = :${paramName}`

            case Operation.IN:
                this.params[paramName] = filter.values
                return `${filter.field} IN (:${paramName})`

            case Operation.LIKE:
                this.params[paramName] = `%${filter.values[0]}%`;
                return `${filter.field} LIKE :${paramName}`
            
            case Operation.GE:
                this.params[paramName] = filter.values[0];
                return `${filter.field} >= :${paramName}`

            default:
                throw new DefaultAppError(`Unknown filter operation: ${filter.op}`)
        }
    }
}
