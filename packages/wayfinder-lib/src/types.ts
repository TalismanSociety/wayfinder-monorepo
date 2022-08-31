import { ChannelObject, Chain, Token } from 'wayfinder-datasource'

export * from 'wayfinder-datasource'

export type AvailableAsset = {
  chain: string
  id: string
  amount: string
}

// question: should i break states into categories?
// I think I want a main state, like ERROR, plus sub states about the main state
// The main state should be indicitave of the flow maybe? or the main/broad categories of the flow?
// The sub-states should represent the sub-flow state?
// I want to make sure I know what part of the proces I'm up to (like step 1, 2 3 etc)
// but then within that, have states for each part of the flow? maybe STEP_STATUS
// with states, is it better to tell the user the problem, or the action to solve it?
// Like: MISSING_INPUT vs INPUT_REQUIRED
// MISSING_INPUT | Please select a destination chain 
// INPUT_REQUIRED | Destination chain is missing
const progress = {
  'ROUTING': {
    'MISSING_INPUT': 'Please select a destination chain',
    'NO_ROUTES_FOUND': '...'
  },
  'TOKENS': {
    'NO_TOKEN': '...',
    'INSUFICIENT_BALANCE': '...'
  },
  'FEES': {
    'BLAH': 'bleh'
  }
}

type DefaultStates = 'INITIALISED'
type ErrorStates = 'MISSING_INPUT'|'NO_ROUTES'|'ERROR'
type ProgressStates = 'LOADING'|'SENDING'|'BLEE'
type SuccessStates = 'ROUTE_FOUND'|'AAA'
export type States = DefaultStates|ErrorStates|ProgressStates|SuccessStates

export type IUserAsset = {
  id: string
  name: string
}

export type SubscriptionCallbackFilters = {
  source: string|undefined
  destination: string|undefined
  token: string|undefined
  amount: string|undefined
}

export type SubscriptionCallbackChannels = {
  all: ChannelObject
  sources: Chain[]
  destinations: Chain[]
  tokens: Token[]
}

export type SubscriptionCallback = {
  filters: SubscriptionCallbackFilters,
  channels: SubscriptionCallbackChannels
  status: States
}

export type UpdateCb = (params: SubscriptionCallback) => void
