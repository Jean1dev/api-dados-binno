export default interface IBuilder<T> {

    build(): T

    validate(): void

    afterValidate(): void

    beforeValidate(): void

    afterBuild(): void

    beforeBuild(): void

    buildFrom(data: T): T
}