import { SubscriptionCallback, IUserAsset } from 'wayfinder-lib';
export declare type IProps = {
    assets?: IUserAsset[];
};
export declare type TReturn = SubscriptionCallback & {
    set(key: string, val: string | undefined): void;
    clear(): void;
};
//# sourceMappingURL=types.d.ts.map