"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = exports.statusMessages = exports.defaultWayfinderSubscriptionResult = exports.defaultQueryResult = exports.defaultInternalVars = exports.defaultInputVars = exports.defaultQuery = void 0;
const client_1 = require("@apollo/client");
const CHAIN_FIELDS = (0, client_1.gql) `
  fragment ChainFields on Chain{
      id
      name
  }
`;
const TOKEN_FIELDS = (0, client_1.gql) `
  fragment TokenFields on Token{
      id
      name
      symbol
  }
`;
const CHILD_FRAGMENT = (0, client_1.gql) `
  ${CHAIN_FIELDS} 
  ${TOKEN_FIELDS}  
  fragment Pieces on ResultGroup{
    channels{
      id
      source {...ChainFields}
      destination { ...ChainFields }
      tokens { ...TokenFields }
    }
    sources { ...ChainFields}
    destinations { ...ChainFields }
    tokens {...TokenFields}
  }
`;
exports.defaultQuery = (0, client_1.gql) `
  ${CHILD_FRAGMENT}
  query GetChannels($source: String, $destination: String, $token: String){
    result(source: $source, destination: $destination, token: $token){
      all{ ...Pieces }
      filtered{ ...Pieces}
      query{
        source
        destination
        token
      }
    }
  }
`;
// these are the inputs we collect from the user
exports.defaultInputVars = {
    account: undefined,
    availableAssets: [],
    source: undefined,
    destination: undefined,
    token: undefined,
    amount: '0',
    destAccount: undefined
};
exports.defaultInternalVars = {
    status: 'INITIALISED',
    statusMessage: null
};
exports.defaultQueryResult = {
    all: {
        channels: [],
        sources: [],
        destinations: [],
        tokens: []
    },
    filtered: {
        channels: [],
        sources: [],
        destinations: [],
        tokens: []
    },
    query: {
        source: null,
        destination: null,
        token: null
    }
};
exports.defaultWayfinderSubscriptionResult = {
    all: exports.defaultQueryResult.all,
    filtered: exports.defaultQueryResult.filtered,
    inputParams: exports.defaultInputVars,
    status: "INITIALISED",
    statusMessage: null,
    submitTransaction: () => false
};
exports.statusMessages = {
    ERROR: 'An unknown error has occurred',
    INITIALISED: 'The wayfinder is initialised',
    FETCHING_ROUTES: 'Fetching routes',
    INPUT_REQUIRED: 'One or more inputs are required in order to find a route',
    ROUTE_NOT_FOUND: 'No routes found given the input paramaters',
    INSUFFICIENT_FUNDS: 'Insufficient funds to make this transaction',
    INSUFICCIENT_FEE: 'Insufficient funds to pay the fee for this transaction',
    READY_TO_PROCESS: 'Everything OK',
    PROCESSING: 'Processing transaction',
    COMPLETE: 'Transaction complete'
};
exports.defaultConfig = {
    uri: 'http://localhost:4350/graphql',
    handleRequestFee: () => '0',
    handleSendTransaction: () => { }
};
