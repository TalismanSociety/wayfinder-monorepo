// Status' and meanings
// These are ordered by flow, start at the top and work down to complete
// Status' will often be accompanied with a (more verbose) status message
// ----------
// ERROR: Some unknown/general error has happened (see message for more info)
// INITIALISED: The initial/default state
// FETCHING_ROUTES: In the process of fetching routes from the source
// INPUT_REQUIRED: Requires more input (from either source, destination, token params) before a route can be determined
// ROUTE_NOT_FOUND: No route was found given the inputs
// INSUFICCIENT_FUNDS: Not enough funds of the token type selected, once a route has been determined
// INSUFICCIENT_FEE: Not enough funds of the fee-type required fo use the route
// READY_TO_PROCESS: Route found, enough token balance, enough fee balance
// PROCESSING: TX submitted and watching progress
// COMPLETE: Sending complete (only watching the source chain)
export type States =
  | 'ERROR'
  | 'INITIALISED'
  | 'FETCHING_ROUTES'
  | 'INPUT_REQUIRED'
  | 'ROUTE_NOT_FOUND'
  | 'MULTIPLE_ROUTES_FOUND'
  | 'INSUFFICIENT_FUNDS'
  | 'INSUFICCIENT_FEE'
  | 'READY_TO_PROCESS'
  | 'PROCESSING'
  | 'COMPLETE'

// a chain type
export type Chain = {
  id: string
  name: string
  addressFormat?: string
}

// a token type
export type Token = {
  id: string
  name: string
  symbol: string
}

// a channel
export type Channel = {
  id: string // the channel ID - muist be unique
  source: Chain // the source chain
  destination: Chain // the destination chain
  tokens: Token[] // the tokens to transfer
}

export type QueryParams = {
  source?: string
  destination?: string
  token?: string
}

export type QueryResultGroupType = {
  channels: Channel[]
  sources: Chain[]
  destinations: Chain[]
  tokens: Token[]
}

export type QueryResultQueryType = {
  source: string | null
  destination: string | null
  token: string | null
}

// this is the type we receive back from the backend/API
export type QueryResultType = {
  all: QueryResultGroupType
  filtered: QueryResultGroupType
  query: QueryResultQueryType
}

export type WayfinderInputVars = {
  account: string | undefined
  availableAssets: AvailableAsset[]
  source: string | undefined
  destination: string | undefined
  token: string | undefined
  amount: string | undefined
  destAccount: string | undefined
}

export type WayfinderInternalVars = {
  status: States
  statusMessage: string | null
}

export type WayfinderSubscriptionResult = {
  all: QueryResultGroupType
  filtered: QueryResultGroupType
  inputParams: WayfinderInputVars
  status: States
  statusMessage: string | null
  submitTransaction: () => boolean
}

// this is the callback type the user expects
export type WayfinderSubscription = (params: WayfinderSubscriptionResult) => void

export type WayfinderHookResult = WayfinderSubscriptionResult & {
  set(key: string | GenericObject, val?: any): void
  clear(): void
}

export type AvailableAsset = {
  chain: string
  token: string
  amount: string
}

// live stats for a channel
export type ChannelStats = {
  sourceFee: string
  sourceExistentialDeposit: string
  destinationFee: string
  destinationExistentialDeposit: string
}

export type WayfinderConfigProps = {
  uri: string
  availableAssets?: AvailableAsset[]
  autoSelectValues?: Boolean
  handleFetchChannelStats(tx: any): ChannelStats
  handleSendTransaction(tx: any): void
}

export type WayfinderRouterProps = {
  uri: string
}

export type WayfinderProps = WayfinderRouterProps & {}

export type GenericObject = {
  [key: string]: any
}
