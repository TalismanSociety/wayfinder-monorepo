import { 
  AvailableAsset,
  States
} from '@talismn/wayfinder-types'

export type DefaultInputVars = {
  source: string|undefined
  destination: string|undefined
  token: string|undefined
  amount: string|undefined
}

export type DefaultInternalVars = {
  status: States
}