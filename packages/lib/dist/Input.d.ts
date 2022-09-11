export default class Input<T> {
    _initialValue?: T;
    _value?: T;
    constructor(value?: T);
    set value(value: T | undefined);
    get value(): T | undefined;
    reset(): void;
}
//# sourceMappingURL=Input.d.ts.map