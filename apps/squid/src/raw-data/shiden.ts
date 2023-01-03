import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  {
    chain: 'shiden',
    token: 'SDN',
    isNative: true,
    existentialDeposit: '1000000',
    tokenIdent: '',
    chaindataId: 'shiden-kusama-substrate-native-sdn',
  },
  {
    chain: 'shiden',
    token: 'KUSD',
    isNative: false,
    existentialDeposit: '1',
    tokenIdent: '18446744073709551616',
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
]

const weightLimit = 'Unlimited'
export const routes: RawData['routes'] = [
  { to: 'karura', token: 'SDN', feeToken: 'SDN', fee: '932400000000000', weightLimit },
  { to: 'karura', token: 'KUSD', feeToken: 'KUSD', fee: '3826597686', weightLimit },
].map((route) => ({ from: 'shiden', ...route }))
