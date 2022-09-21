declare type CallBackType<T> = (params: T) => void;
declare class Subscribable<CbResultType> {
    private callbackStore;
    protected fireSubscriptions(data: CbResultType): void;
    subscribe(cb: CallBackType<CbResultType>): () => void;
}
export default Subscribable;
//# sourceMappingURL=Subscribable.d.ts.map