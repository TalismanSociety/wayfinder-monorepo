import { GenericObject } from '@talismn/wayfinder-types';
declare type InputSet = {
    [key: string]: any;
};
declare class QueryVars {
    private vars;
    private subscriptionService;
    constructor(vars: InputSet);
    set(key: string | GenericObject, value: any, muteUpdate?: Boolean): void;
    get(key: string): any;
    all(): {
        [key: string]: any;
    };
    reset(fields?: string[]): void;
    private triggerUpdate;
    subscribe(cb: (vals: any) => void): () => void;
}
export default QueryVars;
//# sourceMappingURL=InputVars.d.ts.map