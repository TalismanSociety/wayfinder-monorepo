declare type CallBackType<T> = (params: T) => void;
declare class SubscriptionService<CbResultType> {
    private callbackStore;
    private stateHash;
    fire(data: CbResultType): void;
    subscribe(cb: CallBackType<CbResultType>): () => void;
}
export default SubscriptionService;
//# sourceMappingURL=SubscriptionService.d.ts.map