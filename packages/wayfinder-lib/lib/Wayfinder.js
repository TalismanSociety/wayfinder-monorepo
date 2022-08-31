"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWayfinderState = void 0;
const uuid_1 = require("uuid");
const Input_1 = __importDefault(require("./Input"));
const Router_1 = __importDefault(require("./Router"));
exports.initWayfinderState = {
    filters: {
        source: undefined,
        destination: undefined,
        token: undefined,
        amount: undefined,
    },
    channels: {
        all: {},
        sources: [],
        destinations: [],
        tokens: [],
    },
    status: 'INITIALISED'
};
class WayFinder {
    constructor() {
        // the selected values the user has chosen 
        this.selectedSource = new Input_1.default();
        this.selectedDestination = new Input_1.default();
        this.selectedToken = new Input_1.default();
        this.selectedAmount = new Input_1.default();
        // bridges available based on source chain, dest chain and token
        // this has not been filtered by what the user has available
        this.availableChannels = Router_1.default.fetchChannels({});
        // a store of callbacks triggered when this instance updates
        this.callbackStore = {};
        // status of the current wayfinder lookup
        this.status = 'INITIALISED';
        this.reset();
    }
    // sets all assets to filter routes by
    setAvailableAssets(assets) {
        this.availableAssets = assets;
        this.fetchRoutes();
    }
    // clears all assets
    clearAvailableAssets() {
        this.availableAssets = undefined;
        this.fetchRoutes();
    }
    fetchRoutes() {
        // we want to pass through the user defined fields
        // return all routes
        // union with setAvailableAssets - if set
        // fire callbacks with routes
        const filters = {};
        filters.source = this.selectedSource.value;
        filters.destination = this.selectedDestination.value;
        filters.token = this.selectedToken.value;
        this.availableChannels = Router_1.default.fetchChannels(filters);
        this.triggerUpdate();
    }
    // setting the active item based on one selected
    // todo: type the val as a value in the current token|source|destination array
    setFilter(key, val) {
        switch (key) {
            case 'source':
                this.selectedSource.value = val;
                break;
            case 'destination':
                this.selectedDestination.value = val;
                break;
            case 'token':
                this.selectedToken.value = val;
                break;
            case 'amount':
                this.selectedAmount.value = val;
                break;
            default: break;
        }
        this.fetchRoutes();
    }
    reset({ clearAvailableAssets = false } = {}) {
        // reset all the user input options
        this.selectedSource.reset();
        this.selectedDestination.reset();
        this.selectedToken.reset();
        this.selectedAmount.reset();
        // todo - reset all additional fields
        // if there are any, eg receiving address
        // reset user input assets if requested
        if (clearAvailableAssets === true)
            this.clearAvailableAssets();
        // todo
        this.availableChannels = {};
        this.status = "MISSING_INPUT";
        // refetch routes based on new state
        this.fetchRoutes();
    }
    triggerUpdate() {
        // list all the unique source chains available in the current channels set
        const uniqueSources = {};
        Object.values(this.availableChannels).map(({ source }) => {
            uniqueSources[source.id] = source;
        });
        // list all the unique destinaion chains available in the current channels set
        const uniqueDestinations = {};
        Object.values(this.availableChannels).map(({ destination }) => {
            uniqueDestinations[destination.id] = destination;
        });
        // list all the unique tokens available in the current channels set
        const uniqueTokens = {};
        Object.values(this.availableChannels).forEach(({ tokens }) => {
            tokens.forEach(token => uniqueTokens[token.id] = token);
        });
        Object.values(this.callbackStore).forEach(cb => {
            cb({
                filters: {
                    source: this.selectedSource.value,
                    destination: this.selectedDestination.value,
                    token: this.selectedToken.value,
                    amount: this.selectedAmount.value
                },
                channels: {
                    all: this.availableChannels,
                    sources: Object.values(uniqueSources),
                    destinations: Object.values(uniqueDestinations),
                    tokens: Object.values(uniqueTokens)
                },
                status: this.status
            });
        });
    }
    // subscribing to updates
    // return unsub callback to delete subscription
    subscribe(cb) {
        const uuid = (0, uuid_1.v4)();
        this.callbackStore[uuid] = cb;
        this.triggerUpdate();
        return () => {
            delete this.callbackStore[uuid];
        };
    }
}
exports.default = WayFinder;
//# sourceMappingURL=Wayfinder.js.map