"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChangeMon {
    constructor() {
        // keep a state hash in order to minimise callbacks
        this.state = {};
    }
    hasChanged(values) {
        const changeditems = Object.keys(values).filter(key => {
            const existingVal = this.state[key];
            const newVal = values[key];
            const changed = existingVal !== newVal;
            // if we have changed, set the val
            if (!!changed) {
                this.state[key] = newVal;
            }
            return changed;
        });
        return changeditems.length > 0;
    }
}
exports.default = ChangeMon;
