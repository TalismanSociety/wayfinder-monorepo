import { QueryParams, QueryResultType, WayfinderRouterProps } from '@talismn/wayfinder-types';
import { ApolloClient } from '@apollo/client';
import { DocumentNode } from '@apollo/client';
export declare const _defaultQuery: DocumentNode;
declare class Router {
    uri?: string;
    query: DocumentNode;
    client: ApolloClient<import("@apollo/client").NormalizedCacheObject>;
    configure({ uri }: WayfinderRouterProps): void;
    fetchChannels(params: QueryParams): Promise<QueryResultType>;
}
declare const router: Router;
export default router;
//# sourceMappingURL=Router.d.ts.map