"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Subscribable {
    constructor() {
        // a store of callbacks triggered when this instance updates
        this.callbackStore = {};
    }
    // fire all subscriptions
    fireSubscriptions(data) {
        Object.values(this.callbackStore).forEach((cb) => cb(data));
    }
    // subscribing to updates
    // return unsub callback to delete subscription
    subscribe(cb) {
        const uuid = (0, uuid_1.v4)();
        this.callbackStore[uuid] = cb;
        return () => {
            delete this.callbackStore[uuid];
        };
    }
}
exports.default = Subscribable;
