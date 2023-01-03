import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  {
    chain: 'crab',
    token: 'CRAB',
    isNative: true,
    existentialDeposit: '0',
    tokenIdent: '',
    chaindataId: 'crab-kusama-substrate-native-crab',
  },
]

const weightLimit = 'Unlimited'
export const routes: RawData['routes'] = [
  { to: 'karura', token: 'CRAB', feeToken: 'CRAB', fee: '64000000000000000', weightLimit },
].map((route) => ({ from: 'crab', ...route }))
