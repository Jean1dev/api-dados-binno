import IBuilder from "./interfaces/IBuilder";

export default class Builder<T> implements IBuilder<T> {

    public entity: T

    constructor(data: T) { this.entity = data }

    build(): T {
        this.beforeValidate()
        this.validate()
        this.afterValidate()
        this.beforeBuild()
        this.afterBuild()
        return this.entity
    }

    validate(): void {}

    afterValidate(): void {}

    beforeValidate(): void {}

    afterBuild(): void {}

    beforeBuild(): void {}

    buildFrom(data: T): T { return data }

}