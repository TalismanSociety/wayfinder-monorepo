"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const md5_1 = __importDefault(require("md5"));
class SubscriptionService {
    constructor() {
        // a store of callbacks triggered when this instance updates
        this.callbackStore = {};
        // keep a state hash in order to minimise callbacks
        this.stateHash = '';
    }
    // fire all subscriptions
    fire(data) {
        // ensure sure the state has changed before firing
        const newStateHash = (0, md5_1.default)(JSON.stringify(data));
        if (newStateHash === this.stateHash)
            return;
        this.stateHash = newStateHash;
        // todo?: potentially add some stort of debouncer for performance
        Object.values(this.callbackStore).forEach(cb => cb(data));
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
exports.default = SubscriptionService;
