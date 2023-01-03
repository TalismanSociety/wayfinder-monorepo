import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  {
    chain: 'altair',
    token: 'AIR',
    isNative: true,
    existentialDeposit: '1000000000000',
    tokenIdent: '',
    chaindataId: 'altair-substrate-native-air',
  },
  {
    chain: 'altair',
    token: 'KUSD',
    isNative: false,
    existentialDeposit: '100000000000',
    tokenIdent: 'KUSD',
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
]

const weightLimit = '5000000000'
export const routes: RawData['routes'] = [
  { to: 'karura', token: 'AIR', feeToken: 'AIR', fee: '6400000000000000', weightLimit },
  { to: 'karura', token: 'KUSD', feeToken: 'KUSD', fee: '3481902463', weightLimit },
].map((route) => ({ from: 'altair', ...route }))
