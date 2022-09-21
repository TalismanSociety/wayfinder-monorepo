"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const Router_1 = __importDefault(require("./Router"));
const InputVars_1 = __importDefault(require("./InputVars"));
const SubscriptionService_1 = __importDefault(require("./SubscriptionService"));
const ChangeMon_1 = __importDefault(require("./ChangeMon"));
const util_1 = require("./util");
// init a new change monitor
const changeMon = new ChangeMon_1.default();
// init a subscription service
const subscriptionService = new SubscriptionService_1.default();
// init a new state for input vars
const inputVars = new InputVars_1.default(config_1.defaultInputVars);
// init a new state for internal vars
// can probably be merged
// and then can subscribe to certain values rather than all at once
const internalVars = new InputVars_1.default(config_1.defaultInternalVars);
class WayFinder {
    // init the wayfinder lib
    constructor() {
        // wayfinder props
        this.config = config_1.defaultConfig;
        // bridges available based on source chain, dest chain and token
        // this has not been filtered by what the user has available
        this.channelData = { ...config_1.defaultQueryResult };
        // set up a input vars watcher
        inputVars.subscribe(params => this.handleUpdate(params));
        // set up a internal vars watcher
        internalVars.subscribe(() => this.fireSubscriptions());
        // trigger a reset
        this.reset();
    }
    // allow the user to set some internal values
    configure(options) {
        // merge the new options with the old ones
        this.config = {
            ...this.config,
            ...options
        };
        // configure the router
        Router_1.default.configure({ uri: this.config.uri });
    }
    // reset the wayfinder back to its original state
    reset(props) {
        // reset user input assets if requested
        if (props?.clearAvailableAssets === true)
            internalVars.set('availableAssets', null);
        // todo
        this.channelData = { ...config_1.defaultQueryResult };
        // reset all the user input options
        inputVars.reset(['source', 'destination', 'token', 'amount']);
        // reset all internal vars
        internalVars.reset();
        // fire the callback if we have one
        if (!!props?.cb)
            props.cb();
    }
    // define the status   
    updateStatus() {
        internalVars.set('statusMessage', null, true);
        internalVars.set('warning', null, true);
        // check if we have routes available
        if (this.channelData.filtered.channels.length <= 0) {
            internalVars.set('status', 'ROUTE_NOT_FOUND');
            return;
        }
        // determine if user inputs are still required
        if (!this.channelData.query.source ||
            !this.channelData.query.destination ||
            !this.channelData.query.token) {
            // fire this once on init to be sure, to be sure
            if (internalVars.get('status') === 'INITIALISED') {
                this.fireSubscriptions();
            }
            internalVars.set('status', 'INPUT_REQUIRED');
            return;
        }
        // determine if we have a route
        if (!!this.channelData.query.source &&
            !!this.channelData.query.destination &&
            !!this.channelData.query.token &&
            this.channelData.filtered.channels.length === 1) {
            // if we have a route, and all values are set
            // lets figure out the user has enough funds
            const asset = inputVars.get('availableAssets').find(({ chain, token }) => {
                return chain === inputVars.get('source') && token === inputVars.get('token');
            });
            // calculate gat, existentialDeposits, totals etc
            const gas = +this.config.handleRequestFee('test');
            const existentialDepositSource = 1;
            const existentialDepositDestination = 1;
            const amount = +inputVars.get('amount');
            const amountAndGas = amount + gas;
            // TODO: use asert here to make it easier
            // AMOUNT CHECK: amount must be greater than 0
            if (amount <= 0) {
                internalVars.set('status', 'INPUT_REQUIRED');
                return;
            }
            // SOURCE REAP CHECK: check the amount being sent will reap the source account
            if (amountAndGas + existentialDepositSource > asset.amount) {
                internalVars.set('status', 'INSUFFICIENT_FUNDS');
                internalVars.set('statusMessage', `Performing this action will reap your account.`);
                return;
            }
            // DESTINATION REAP CHECK: check if amount being sent will reap the destinaion address
            // TODO: check the receiving chain for a balance and make a decision here
            if (amount < existentialDepositDestination) {
                internalVars.set('status', 'INSUFFICIENT_FUNDS');
                internalVars.set('statusMessage', `${amount} is below the existential depost amount required on ${inputVars.get('destination')}.`);
                return;
            }
            // TODO GAS CHECK: check the gas token contains enough funds + reapage?
            if (1 > 1) {
                internalVars.set('status', 'INSUFFICIENT_FUNDS');
                internalVars.set('statusMessage', `Not enough gas.`);
                return;
            }
            // made all the checks, looks like this will work
            // all the user to proceed
            internalVars.set('status', 'READY_TO_PROCESS');
            return;
        }
        // update the status
        internalVars.set('status', 'INITIALISED');
    }
    // update the wayfinder state based on input values
    // this should only trigger when something changes
    async handleUpdate(params) {
        // get all vars
        const { account, source, destination, token, availableAssets } = params;
        // we only want to trigger this when source, destination or token has changed
        // or while we have no routes
        if (
        // check these vals for change
        changeMon.hasChanged({
            source,
            destination,
            token,
            account,
            status: internalVars.get('status')
        }) ||
            // or, check we're in any of these statuses
            ['INITIALISED', 'NO_ROUTE_FOUND'].includes(internalVars.get('status'))) {
            try {
                internalVars.set('status', 'FETCHING_ROUTES');
                // fetch routes form routing service
                const channelData = await Router_1.default.fetchChannels({ source, destination, token });
                // hack to get around routes not returning anything
                if (!Object.keys(channelData).length)
                    return;
                // set the channelData
                this.channelData = channelData;
            }
            catch (error) {
                internalVars.set('status', 'ERROR');
            }
        }
        // TODO ----- ONLY DO THIS WHEN WHEN AVAILABLEASSETS CHANGED
        if (changeMon.hasChanged({ availableAssets, filteredAssets: this.channelData.filtered })) {
            this.channelData.filtered = (0, util_1.filterChannelDataByAssets)(this.channelData.filtered, availableAssets);
        }
        // attempt autoselect remaining fields
        // do not trigger updates here
        this.attemptAutoSelect();
        // update the global status
        this.updateStatus();
        // trigger an update
        this.fireSubscriptions();
    }
    // attempt autoselect fields based on filtered route information
    // do not trigger callback after this
    attemptAutoSelect() {
        if (this.config?.autoSelectValues === true) {
            if (!inputVars.get('source') && this.channelData.filtered.sources.length === 1) {
                inputVars.set('source', this.channelData.filtered.sources[0].id, true);
            }
            if (!inputVars.get('destination') && this.channelData.filtered.destinations.length === 1) {
                inputVars.set('destination', this.channelData.filtered.destinations[0].id, true);
            }
            if (!inputVars.get('token') && this.channelData.filtered.tokens.length === 1) {
                inputVars.set('token', this.channelData.filtered.tokens[0].id, true);
            }
        }
    }
    // setting the active item based on one selected
    // todo: type the val as a value in the current token|source|destination array
    setFilter(key, value) {
        if (key === 'account' || Object.keys(key).includes('account'))
            this.reset();
        inputVars.set(key, value);
    }
    // trigger all teh callbacks to be called after an update
    fireSubscriptions() {
        const status = internalVars.get('status');
        // define the data
        const cbData = {
            all: this.channelData.all,
            filtered: this.channelData.filtered,
            inputParams: inputVars.all(),
            status: status,
            statusMessage: internalVars.get('statusMessage') || config_1.statusMessages[status]
        };
        subscriptionService.fire(cbData);
    }
    // subscribing to updates
    // return unsub callback to delete subscription
    subscribe(cb) {
        const unsub = subscriptionService.subscribe(cb);
        this.fireSubscriptions();
        return unsub;
    }
}
exports.default = WayFinder;
