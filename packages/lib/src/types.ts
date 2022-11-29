import { AvailableAsset, States } from '@talismn/wayfinder-types'

export type _DefaultInputVars = {
  account: string | undefined
  availableAssets: AvailableAsset[]
  source: string | undefined
  destination: string | undefined
  token: string | undefined
  amount: string | undefined
  destAccount: string | undefined
}

export type _DefaultInternalVars = {
  status: States
}
