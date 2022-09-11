declare type InputSet = {
    [key: string]: any;
};
declare class QueryVars {
    private vars;
    private callbackStore;
    constructor(vars: InputSet);
    set(key: string, value: any): void;
    get(key: string): string;
    reset(fields?: string[]): void;
    private triggerUpdate;
    subscribe(cb: (vals: any) => void): () => void;
}
export default QueryVars;
//# sourceMappingURL=InputVars.d.ts.map