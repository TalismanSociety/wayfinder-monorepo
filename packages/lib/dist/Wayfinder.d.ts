import { WayfinderProps, WayfinderCallback, WayfinderConfigProps } from '@talismn/wayfinder-types';
declare class WayFinder {
    private inputVars;
    private internalVars;
    private channelData;
    private callbackStore;
    private availableAssets;
    private autoSelectValues;
    constructor({ uri }: WayfinderProps);
    configure(props: WayfinderConfigProps): void;
    reset({ clearAvailableAssets }?: {
        clearAvailableAssets?: boolean;
    }): void;
    private fetchRoutes;
    private updateStatus;
    private handleUpdate;
    setFilter(key: string, val: string | undefined): void;
    private fireSubscriptions;
    subscribe(cb: WayfinderCallback): () => void;
}
export default WayFinder;
//# sourceMappingURL=Wayfinder.d.ts.map