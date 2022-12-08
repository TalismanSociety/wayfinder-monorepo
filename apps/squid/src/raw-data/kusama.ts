import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  {
    chain: 'kusama',
    token: 'KSM',
    isNative: true,
    existentialDeposit: '79999999',
    tokenIdent: '',
  },
]

export const routes: RawData['routes'] = [
  {
    from: 'kusama',
    to: 'karura',
    token: 'KSM',
    feeToken: 'KSM',
    fee: '64000000',
    weightLimit: 'Unlimited',
  },
  {
    from: 'kusama',
    to: 'statemine',
    token: 'KSM',
    feeToken: 'KSM',
    fee: '4000000000',
    weightLimit: 'Unlimited',
  },
]
