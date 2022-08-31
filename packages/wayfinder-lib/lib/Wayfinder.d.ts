import { UpdateCb, AvailableAsset, SubscriptionCallback } from './types';
export declare const initWayfinderState: SubscriptionCallback;
declare class WayFinder {
    private availableAssets?;
    private selectedSource;
    private selectedDestination;
    private selectedToken;
    private selectedAmount;
    private availableChannels;
    private callbackStore;
    private status;
    private statusMessage?;
    constructor();
    setAvailableAssets(assets: AvailableAsset[]): void;
    clearAvailableAssets(): void;
    private fetchRoutes;
    setFilter(key: string, val: string | undefined): void;
    reset({ clearAvailableAssets }?: {
        clearAvailableAssets?: boolean;
    }): void;
    triggerUpdate(): void;
    subscribe(cb: UpdateCb): () => void;
}
export default WayFinder;
//# sourceMappingURL=Wayfinder.d.ts.map