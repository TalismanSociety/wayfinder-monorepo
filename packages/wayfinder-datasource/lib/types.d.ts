export declare type Chain = {
    id: string;
    name: string;
};
export declare type Token = {
    id: string;
    name: string;
    symbol: string;
};
export declare type Param = {
    key: string;
    name: string;
    type: string;
};
export declare type Pallet = {
    id: string;
    name: string;
    method: string;
    params: {
        [key: string]: Param;
    };
};
export declare type Channel = {
    id: string;
    source: Chain;
    destination: Chain;
    pallet: Pallet;
    tokens: Token[];
};
export declare type ChannelObject = {
    [key: string]: Channel;
};
export declare type QueryParams = {
    source?: string;
    destination?: string;
    token?: string;
};
//# sourceMappingURL=types.d.ts.map