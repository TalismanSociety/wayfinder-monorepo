import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  {
    chain: 'quartz',
    token: 'QTZ',
    isNative: true,
    existentialDeposit: '1000000000000000000',
    tokenIdent: '',
    chaindataId: 'quartz-substrate-native-qtz',
  },
]

const weightLimit = 'Unlimited'
export const routes: RawData['routes'] = [
  { to: 'karura', token: 'QTZ', feeToken: 'QTZ', fee: '64000000000000000', weightLimit },
].map((route) => ({ from: 'quartz', ...route }))
