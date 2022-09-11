"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    constructor() {
        this.source = new Variable();
        this.destination = new Variable();
        this.token = new Variable();
    }
    set() {
    }
    reset() {
        this.source.reset();
        this.destination.reset();
        this.token.reset();
    }
}
exports.default = QueryVars;
