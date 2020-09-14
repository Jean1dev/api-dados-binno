import { SelectQueryBuilder } from "typeorm";
import FiltersExpression from "../graphql/shared/FiltersExpression";

export default class JoinBuilder<T> {

    private joinedEntities = new Set<string>()

    constructor(
        private readonly queryBuilder: SelectQueryBuilder<T>,
        private filtersExpression?: FiltersExpression) { }

    public build() {
        if (this.filtersExpression) {
            this.buildJoinEntitiesRec(this.filtersExpression)
        }
    }

    private buildJoinEntitiesRec(filters: FiltersExpression) {
        filters.filters.forEach(filterable =>
            this.addJoinEntity(filterable.field, filterable.relationField))

        filters.childExpressions?.forEach(filterable => this.buildJoinEntitiesRec(filterable))
    }

    private addJoinEntity(field: string, relationField?: string) {
        const entityName = field.split('.')[0]

        if (relationField && !this.joinedEntities.has(entityName)) {
            this.queryBuilder.leftJoinAndSelect(relationField, entityName)
            this.joinedEntities.add(entityName)
        }
    }
}