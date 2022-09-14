import { WayfinderCallback, WayfinderConfigProps, GenericObject } from '@talismn/wayfinder-types';
declare class WayFinder {
    private inputVars;
    private internalVars;
    private channelData;
    private callbackStore;
    private autoSelectValues;
    constructor();
    configure(props: WayfinderConfigProps): void;
    reset(props?: {
        clearAvailableAssets?: boolean;
        cb: () => void;
    }): void;
    private updateStatus;
    private handleUpdate;
    setFilter(key: string | GenericObject, value?: any): void;
    private fireSubscriptions;
    subscribe(cb: WayfinderCallback): () => void;
}
export default WayFinder;
//# sourceMappingURL=Wayfinder.d.ts.map