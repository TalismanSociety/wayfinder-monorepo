export declare type States = 'ERROR' | 'INITIALISED' | 'FETCHING_ROUTES' | 'INPUT_REQUIRED' | 'ROUTE_NOT_FOUND' | 'INSUFFICIENT_FUNDS' | 'INSUFICCIENT_FEE' | 'READY_TO_PROCESS' | 'PROCESSING' | 'COMPLETE';
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
export declare type WayfinderInputVars = {
    account: string | undefined;
    availableAssets: AvailableAsset[];
    source: string | undefined;
    destination: string | undefined;
    token: string | undefined;
    amount: string | undefined;
    destAccount: string | undefined;
};
export declare type WayfinderInternalVars = {
    status: States;
    statusMessage: string | null;
};
export declare type WayfinderSubscriptionResult = {
    all: QueryResultGroupType;
    filtered: QueryResultGroupType;
    inputParams: WayfinderInputVars;
    status: States;
    statusMessage: string | null;
    submitTransaction: () => boolean;
};
export declare type WayfinderSubscription = (params: WayfinderSubscriptionResult) => void;
export declare type WayfinderHookResult = WayfinderSubscriptionResult & {
    set(key: string | GenericObject, val?: any): void;
    clear(): void;
};
export declare type AvailableAsset = {
    chain: string;
    token: string;
    amount: string;
};
export declare type WayfinderConfigProps = {
    uri: string;
    availableAssets?: AvailableAsset[];
    autoSelectValues?: Boolean;
    handleRequestFee(chain: any): string;
    handleSendTransaction(tx: any): void;
};
export declare type WayfinderRouterProps = {
    uri: string;
};
export declare type WayfinderProps = WayfinderRouterProps & {};
export declare type GenericObject = {
    [key: string]: any;
};
//# sourceMappingURL=index.d.ts.map