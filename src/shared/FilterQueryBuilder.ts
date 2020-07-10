import { BaseEntity, SelectQueryBuilder, Repository, DeepPartial } from "typeorm";
import FiltersExpression from "../graphql/shared/FiltersExpression";
import JoinBuilder from "./JoinBuilder";
import WhereBuilder from "./WhereBuilder";

export default class FilterQueryBuilder<T extends DeepPartial<BaseEntity>> {

    private readonly queryBuilder: SelectQueryBuilder<T>

    constructor(
        entityRepository: Repository<T>,
        private filtersExpression?: FiltersExpression) {
        this.queryBuilder = entityRepository.createQueryBuilder()
    }

    public build() {
        new JoinBuilder<T>(this.queryBuilder, this.filtersExpression).build()
        new WhereBuilder<T>(this.queryBuilder, this.filtersExpression).build()
        
        return this.queryBuilder
    }
}