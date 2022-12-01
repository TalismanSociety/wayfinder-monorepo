import { gql } from '@apollo/client'
import {
  QueryResultType,
  WayfinderConfigProps,
  WayfinderInputVars,
  WayfinderInternalVars,
  WayfinderSubscriptionResult,
} from '@talismn/wayfinder-types'

const CHAIN_FIELDS = gql`
  fragment ChainFields on Chain {
    id
    name
  }
`

const TOKEN_FIELDS = gql`
  fragment TokenFields on Token {
    id
    name
    symbol
  }
`

const CHILD_FRAGMENT = gql`
  ${CHAIN_FIELDS}
  ${TOKEN_FIELDS}
  fragment Pieces on ResultGroup {
    channels {
      id
      source {
        ...ChainFields
      }
      destination {
        ...ChainFields
      }
      tokens {
        ...TokenFields
      }
    }
    sources {
      ...ChainFields
    }
    destinations {
      ...ChainFields
    }
    tokens {
      ...TokenFields
    }
  }
`

export const defaultQuery = gql`
  ${CHILD_FRAGMENT}
  query GetChannels($source: String, $destination: String, $token: String) {
    result(source: $source, destination: $destination, token: $token) {
      all {
        ...Pieces
      }
      filtered {
        ...Pieces
      }
      query {
        source
        destination
        token
      }
    }
  }
`

// these are the inputs we collect from the user
export const defaultInputVars: WayfinderInputVars = {
  account: undefined,
  availableAssets: [],
  source: undefined,
  destination: undefined,
  token: undefined,
  amount: '0',
  destAccount: undefined,
}

export const defaultInternalVars: WayfinderInternalVars = {
  status: 'INITIALISED',
  statusMessage: null,
}

export const defaultQueryResult: QueryResultType = {
  all: {
    channels: [],
    sources: [],
    destinations: [],
    tokens: [],
  },
  filtered: {
    channels: [],
    sources: [],
    destinations: [],
    tokens: [],
  },
  query: {
    source: null,
    destination: null,
    token: null,
  },
}

export const defaultWayfinderSubscriptionResult: WayfinderSubscriptionResult = {
  all: defaultQueryResult.all,
  filtered: defaultQueryResult.filtered,
  inputParams: defaultInputVars,
  status: 'INITIALISED',
  statusMessage: null,
  submitTransaction: () => false,
}

export const statusMessages = {
  ERROR: 'An unknown error has occurred',
  INITIALISED: 'The wayfinder is initialised',
  FETCHING_ROUTES: 'Fetching routes',
  INPUT_REQUIRED: 'One or more inputs are required in order to find a route',
  ROUTE_NOT_FOUND: 'No routes found given the input paramaters',
  INSUFFICIENT_FUNDS: 'Insufficient funds to make this transaction',
  INSUFICCIENT_FEE: 'Insufficient funds to pay the fee for this transaction',
  READY_TO_PROCESS: 'Everything OK',
  PROCESSING: 'Processing transaction',
  COMPLETE: 'Transaction complete',
}

export const defaultConfig: WayfinderConfigProps = {
  uri: 'http://localhost:4350/graphql',
  handleFetchChannelStats: (tx: any) => {},
  handleSendTransaction: (tx: any) => {},
}
