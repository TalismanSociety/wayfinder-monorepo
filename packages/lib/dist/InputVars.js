"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SubscriptionService_1 = __importDefault(require("./SubscriptionService"));
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
        this.vars = {};
        this.subscriptionService = new SubscriptionService_1.default();
        Object.keys(vars).forEach(key => {
            const val = vars[key];
            this.vars[key] = new Variable(val);
        });
        this.triggerUpdate();
    }
    // set a value - make sure it's in the set of allowed values
    set(key, value, muteUpdate) {
        if (typeof key === 'object') {
            Object.keys(key).forEach(_key => {
                if (!this.vars[_key])
                    return;
                this.vars[_key].value = key[_key];
            });
            muteUpdate !== true && this.triggerUpdate();
        }
        else {
            if (!this.vars[key])
                return;
            this.vars[key].value = value;
            muteUpdate !== true && this.triggerUpdate();
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
        this.subscriptionService.fire(returnObj);
    }
    // subscription service
    subscribe(cb) {
        const unsub = this.subscriptionService.subscribe(cb);
        this.triggerUpdate();
        return unsub;
    }
}
exports.default = QueryVars;
