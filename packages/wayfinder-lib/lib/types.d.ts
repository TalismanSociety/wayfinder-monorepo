import { ChannelObject, Chain, Token } from 'wayfinder-datasource';
export * from 'wayfinder-datasource';
export declare type AvailableAsset = {
    chain: string;
    id: string;
    amount: string;
};
declare type DefaultStates = 'INITIALISED';
declare type ErrorStates = 'MISSING_INPUT' | 'NO_ROUTES' | 'ERROR';
declare type ProgressStates = 'LOADING' | 'SENDING' | 'BLEE';
declare type SuccessStates = 'ROUTE_FOUND' | 'AAA';
export declare type States = DefaultStates | ErrorStates | ProgressStates | SuccessStates;
export declare type IUserAsset = {
    id: string;
    name: string;
};
export declare type SubscriptionCallbackFilters = {
    source: string | undefined;
    destination: string | undefined;
    token: string | undefined;
    amount: string | undefined;
};
export declare type SubscriptionCallbackChannels = {
    all: ChannelObject;
    sources: Chain[];
    destinations: Chain[];
    tokens: Token[];
};
export declare type SubscriptionCallback = {
    filters: SubscriptionCallbackFilters;
    channels: SubscriptionCallbackChannels;
    status: States;
};
export declare type UpdateCb = (params: SubscriptionCallback) => void;
//# sourceMappingURL=types.d.ts.map