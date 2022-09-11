"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._defaultQuery = void 0;
const client_1 = require("@apollo/client");
const config_1 = require("./config");
exports._defaultQuery = (0, client_1.gql) `
  query GetChannels{
    result{
      all{
        channels{
          id
        }
      }
      query{
        source
        destination
        token
      }
    }
  }
`;
const defaultApolloClientOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
};
class Router {
    constructor() {
        this.uri = undefined;
        this.query = config_1.defaultQuery;
        this.client = new client_1.ApolloClient({ cache: new client_1.InMemoryCache() });
    }
    configure({ uri }) {
        this.uri = uri;
        this.client = new client_1.ApolloClient({
            uri: this.uri,
            cache: new client_1.InMemoryCache({
                addTypename: false
            }),
            defaultOptions: defaultApolloClientOptions,
            assumeImmutableResults: true
        });
    }
    async fetchChannels(params) {
        const result = await this.client.query({ query: this.query, variables: { ...params } });
        return {
            ...result?.data?.result || config_1.defaultQueryResult
        };
    }
}
const router = new Router();
exports.default = router;
