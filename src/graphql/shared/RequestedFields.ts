import graphqlFields from 'graphql-fields';
import {union, difference } from 'lodash'
import {GraphQLResolveInfo} from "graphql";

export default class RequestedFields {

    public getFields(info: GraphQLResolveInfo, options?: {keep?: string[], exclude?: string[]}) {
        // @ts-ignore
        const requestedFields = graphqlFields(info, {}, { processArguments: true })
        // @ts-ignore
        let fields: string[] = Object.keys(requestedFields['items'])

        if (!options) {
            return fields
        }

        fields = (options.keep) ? union<string>(fields, options.keep) : fields
        // @ts-ignore
        return (options.exclude) ? difference<string>(fields, options.exclude) : fields
    }
}