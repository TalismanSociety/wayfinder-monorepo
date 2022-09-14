import { GenericObject } from '@talismn/wayfinder-types';
declare type InputSet = {
    [key: string]: any;
};
declare class QueryVars {
    private time;
    private timeout;
    private vars;
    private callbackStore;
    constructor(vars: InputSet);
    set(key: string | GenericObject, value?: any): void;
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