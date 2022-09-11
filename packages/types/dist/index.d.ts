export declare type States = 'INITIALISED' | 'MISSING_INPUT' | 'NO_ROUTES' | 'ROUTE_FOUND' | 'ERROR' | 'LOADING' | 'SENDING';
export declare type Chain = {
    id: string;
    name: string;
};
export declare type Token = {
    id: string;
    name: string;
    symbol: string;
};
export declare type Channel = {
    id: string;
    source: Chain;
    destination: Chain;
    tokens: Token[];
};
export declare type QueryParams = {
    source?: string;
    destination?: string;
    token?: string;
};
export declare type QueryResultGroupType = {
    channels: Channel[];
    sources: Chain[];
    destinations: Chain[];
    tokens: Token[];
};
export declare type QueryResultQueryType = {
    source: string | null;
    destination: string | null;
    token: string | null;
};
export declare type QueryResultType = {
    all: QueryResultGroupType;
    filtered: QueryResultGroupType;
    query: QueryResultQueryType;
};
export declare type WayfinderCallbackResult = QueryResultType & {
    status: States;
};
export declare type WayfinderCallback = (params: WayfinderCallbackResult) => void;
export declare type WayfinderHookResult = WayfinderCallbackResult & {
    set(key: string, val: string | undefined): void;
    clear(): void;
};
export declare type AvailableAsset = {
    chain: string;
    token: string;
    amount: string;
};
export declare type WayfinderConfigProps = {
    availableAssets?: AvailableAsset[];
    autoSelectValues?: Boolean;
};
export declare type WayfinderRouterProps = {
    uri: string;
};
export declare type WayfinderProps = WayfinderRouterProps & {};
//# sourceMappingURL=index.d.ts.map