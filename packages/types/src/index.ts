export type States = 'INITIALISED'|'MISSING_INPUT'|'NO_ROUTES'|'ROUTE_FOUND'|'ERROR'|'LOADING'|'SENDING'

// a chain type
export type Chain = {
	id: string
	name: string
}

// a token type
export type Token = {
	id: string
	name: string
	symbol: string
}

// a channel
export type Channel = {
	id: string    				// the channel ID - muist be unique
	source: Chain         // the source chain
	destination: Chain    // the destination chain
	tokens: Token[]       // the tokens to transfer
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
  source: string|null
  destination: string|null
  token: string|null
}

// this is the type we receive back from the backend/API
export type QueryResultType = {
  all: QueryResultGroupType
  filtered: QueryResultGroupType
  query: QueryResultQueryType
}

export type WayfinderInputVars = {
  account: string|undefined
  availableAssets: AvailableAsset[]
  source: string|undefined
  destination: string|undefined
  token: string|undefined
  amount: string|undefined
  destAccount: string|undefined
}

export type WayfinderInternalVars = {
  status: States
  statusMessage: string|null 
}

export type WayfinderCallbackResult = {
  all: QueryResultGroupType
  filtered: QueryResultGroupType
  inputParams: WayfinderInputVars
  status: States
}

// this is the callback type the user expects
export type WayfinderCallback = (params: WayfinderCallbackResult) => void

export type WayfinderHookResult = WayfinderCallbackResult & {
  set(key: string|GenericObject, val?: any): void
  clear(): void
}

export type AvailableAsset = {
  chain: string
  token: string
  amount: string
}


export type WayfinderConfigProps = {
  uri: string
  availableAssets?: AvailableAsset[]
  autoSelectValues?: Boolean
}


export type WayfinderRouterProps = {
  uri: string
}

export type WayfinderProps = WayfinderRouterProps & {}

export type GenericObject = {
  [key: string]: any
}