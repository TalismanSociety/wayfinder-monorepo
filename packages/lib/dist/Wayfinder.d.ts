import { WayfinderSubscription, WayfinderConfigProps, GenericObject } from '@talismn/wayfinder-types';
declare class WayFinder {
    private config;
    private channelData;
    constructor();
    configure(options: WayfinderConfigProps): void;
    reset(props?: {
        clearAvailableAssets?: boolean;
        cb: () => void;
    }): void;
    private updateStatus;
    private handleUpdate;
    private attemptAutoSelect;
    setFilter(key: string | GenericObject, value?: any): void;
    private fireSubscriptions;
    subscribe(cb: WayfinderSubscription): () => void;
}
export default WayFinder;
//# sourceMappingURL=Wayfinder.d.ts.map