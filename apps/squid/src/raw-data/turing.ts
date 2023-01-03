import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  {
    chain: 'turing',
    token: 'TUR',
    isNative: true,
    existentialDeposit: '100000000',
    tokenIdent: 'TUR',
    chaindataId: 'turing-substrate-native-tur',
  },
  {
    chain: 'turing',
    token: 'KAR',
    isNative: false,
    existentialDeposit: '100000000000',
    tokenIdent: 'KAR',
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  // TODO: Double check that this shouldn't be `tokenIdent: 'KUSD'`
  {
    chain: 'turing',
    token: 'KUSD',
    isNative: false,
    existentialDeposit: '10000000000',
    tokenIdent: 'AUSD',
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'turing',
    token: 'LKSM',
    isNative: false,
    existentialDeposit: '500000000',
    tokenIdent: 'LKSM',
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
]

const weightLimit = '5000000000'
export const routes: RawData['routes'] = [
  { to: 'karura', token: 'TUR', feeToken: 'TUR', fee: '2560000000', weightLimit },
  { to: 'karura', token: 'KAR', feeToken: 'KAR', fee: '6400000000', weightLimit },
  { to: 'karura', token: 'KUSD', feeToken: 'KUSD', fee: '2626579278', weightLimit },
  { to: 'karura', token: 'LKSM', feeToken: 'LKSM', fee: '480597195', weightLimit },
].map((route) => ({ from: 'turing', ...route }))
