"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Input {
    constructor(value) {
        this._initialValue = value;
        this._value = value;
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
exports.default = Input;
