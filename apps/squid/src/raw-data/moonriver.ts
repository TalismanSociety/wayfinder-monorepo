import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  {
    chain: 'moonriver',
    token: 'MOVR',
    isNative: false,
    existentialDeposit: '1000000000000000',
    tokenIdent: '',
    chaindataId: 'moonriver-substrate-native-movr',
  },
  {
    chain: 'moonriver',
    token: 'KAR',
    isNative: false,
    existentialDeposit: '0',
    tokenIdent: '',
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'moonriver',
    token: 'KUSD',
    isNative: false,
    existentialDeposit: '0',
    tokenIdent: '',
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
]

// TODO: Implement this
export const routes: RawData['routes'] = []
