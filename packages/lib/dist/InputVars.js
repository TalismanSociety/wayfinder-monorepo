"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Variable {
    constructor(defaultValue) {
        this._initialValue = null;
        this._value = null;
        this._initialValue = defaultValue || null;
        this._value = defaultValue || null;
    }
    set value(value) {
        this._value = value;
    }
    get value() {
        return this._value;
    }
    reset() {
        this._value = this._initialValue;
    }
}
class QueryVars {
    constructor(vars) {
        this.time = new Date().getTime();
        this.timeout = setTimeout(() => { }, 0);
        this.vars = {};
        this.callbackStore = {};
        Object.keys(vars).forEach(key => {
            const val = vars[key];
            this.vars[key] = new Variable(val);
        });
        this.triggerUpdate();
    }
    // set a value - make sure it's in the set of allowed values
    set(key, value) {
        if (typeof key === 'object') {
            Object.keys(key).forEach(_key => {
                if (!this.vars[_key])
                    return;
                this.vars[_key].value = key[_key];
            });
            this.triggerUpdate();
        }
        else {
            if (!this.vars[key] || !value)
                return;
            this.vars[key].value = value;
            this.triggerUpdate();
        }
    }
    get(key) {
        return this.vars[key].value;
    }
    all() {
        const all = {};
        Object.keys(this.vars).forEach(key => {
            all[key] = this.vars[key].value;
        });
        return all;
    }
    // itterate through all vars and reset back to default value
    reset(fields) {
        Object.keys(this.vars).forEach((key) => {
            // only reset the fields specified, otherwise all if not specified
            (!fields || fields.includes(key)) && this.vars[key].reset();
        });
        this.triggerUpdate();
    }
    // subscription callback
    triggerUpdate() {
        const returnObj = {};
        Object.keys(this.vars).forEach(key => returnObj[key] = this.vars[key].value);
        Object.values(this.callbackStore).forEach(cb => {
            cb(returnObj);
        });
    }
    // subscription service
    subscribe(cb) {
        const uuid = (0, uuid_1.v4)();
        this.callbackStore[uuid] = cb;
        this.triggerUpdate();
        return () => {
            delete this.callbackStore[uuid];
        };
    }
}
exports.default = QueryVars;
