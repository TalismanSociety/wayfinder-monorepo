"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const Router_1 = __importDefault(require("./Router"));
const InputVars_1 = __importDefault(require("./InputVars"));
const util_1 = require("./util");
const config_1 = require("./config");
// these are the inputs we collect from the user
const defaultInputVars = {
    source: undefined,
    destination: undefined,
    token: undefined,
    amount: undefined,
};
const defaultInternalVars = {
    status: 'INITIALISED'
};
class WayFinder {
    // init the wayfinder lib
    constructor({ uri }) {
        // maintains input value state
        this.inputVars = new InputVars_1.default(defaultInputVars);
        // internal vars
        this.internalVars = new InputVars_1.default(defaultInternalVars);
        // bridges available based on source chain, dest chain and token
        // this has not been filtered by what the user has available
        this.channelData = { ...config_1.defaultQueryResult };
        // a store of callbacks triggered when this instance updates
        this.callbackStore = {};
        // the user defined available assets
        this.availableAssets = undefined;
        // determines if the wayfinder auto selects values beased on available routes
        // if there's 1 options available for a certain input field, it will automatically be selected
        this.autoSelectValues = false;
        // set up a input vars watcher
        this.inputVars.subscribe((params) => this.handleUpdate(params));
        // set up a internal vars watcher
        this.internalVars.subscribe(() => this.fireSubscriptions());
        // configure the router
        Router_1.default.configure({ uri });
        // trigger a reset
        this.reset();
    }
    // allow the user to set some internal values
    configure(props) {
        this.availableAssets = props.availableAssets;
        this.autoSelectValues = props.autoSelectValues || false;
    }
    // reset the wayfinder back to its original state
    reset({ clearAvailableAssets = false } = {}) {
        // reset user input assets if requested
        if (clearAvailableAssets === true)
            this.internalVars.set('availableAssets', null);
        // todo
        this.channelData = { ...config_1.defaultQueryResult };
        // reset all the user input options
        this.inputVars.reset(['source', 'destination', 'token']);
        // reset all internal vars
        this.internalVars.reset();
    }
    // fetch all the routes based on source chain, destination chain and token
    async fetchRoutes(params) {
        // deconstruct the params
        const { source, destination, token, } = params;
        // pluck out the vars we need in the query
        const queryVars = { source, destination, token };
        // run the query
        return await Router_1.default.fetchChannels(queryVars);
    }
    updateStatus() {
        // check if there are channels returned
        if (this.channelData.filtered.channels.length <= 0) {
            this.internalVars.set('status', 'NO_ROUTES');
            return;
        }
        // determine user inputs
        if (!this.channelData.query.source ||
            !this.channelData.query.destination ||
            !this.channelData.query.token) {
            if (this.internalVars.get('status') === 'INITIALISED') {
                this.fireSubscriptions();
            }
            this.internalVars.set('status', 'MISSING_INPUT');
            return;
        }
        // determine if we have a route
        if (!!this.channelData.query.source &&
            !!this.channelData.query.destination &&
            !!this.channelData.query.token &&
            this.channelData.filtered.channels.length === 1) {
            this.internalVars.set('status', 'ROUTE_FOUND');
            return;
        }
        // update the status
        this.internalVars.set('status', 'INITIALISED');
    }
    // update the wayfinder state based on input values
    // this should only trigger when something changes
    async handleUpdate(params) {
        // get all vars
        const { source, destination, token, amount } = params;
        // fetch routes
        const channelData = await this.fetchRoutes({ source, destination, token });
        // hack to get around routes not returning anything
        if (!Object.keys(channelData).length)
            return;
        // set the channelData
        this.channelData = channelData;
        // set the filtered routes based on the user tokens
        this.channelData.filtered = (0, util_1.filterChannelDataByAssets)(this.channelData.filtered, this.availableAssets);
        // if there's only one available source, destination or token automatically set the values
        if (this.autoSelectValues === true) {
            if (!this.inputVars.get('source') && this.channelData.filtered.sources.length === 1) {
                this.inputVars.set('source', this.channelData.filtered.sources[0].id);
            }
            if (!this.inputVars.get('destination') && this.channelData.filtered.destinations.length === 1) {
                this.inputVars.set('destination', this.channelData.filtered.destinations[0].id);
            }
            if (!this.inputVars.get('token') && this.channelData.filtered.tokens.length === 1) {
                this.inputVars.set('token', this.channelData.filtered.tokens[0].id);
            }
        }
        // update the status
        this.updateStatus();
        // trigger an update
        this.fireSubscriptions();
    }
    // setting the active item based on one selected
    // todo: type the val as a value in the current token|source|destination array
    setFilter(key, val) {
        this.inputVars.set(key, val);
    }
    // trigger all teh callbacks to be called after an update
    fireSubscriptions() {
        //if(this.internalVars.get('status') === 'INITIALISED') return
        Object.values(this.callbackStore).forEach(cb => {
            cb({
                ...this.channelData,
                status: this.internalVars.get('status')
            });
        });
    }
    // subscribing to updates
    // return unsub callback to delete subscription
    subscribe(cb) {
        const uuid = (0, uuid_1.v4)();
        this.callbackStore[uuid] = cb;
        this.fireSubscriptions();
        return () => {
            delete this.callbackStore[uuid];
        };
    }
}
exports.default = WayFinder;
