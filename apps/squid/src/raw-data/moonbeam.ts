import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  {
    chain: 'moonbeam',
    token: 'GLMR',
    isNative: true,
    existentialDeposit: '100000000000000000',
    tokenIdent: '',
    chaindataId: 'moonbeam-substrate-native-glmr',
  },
  {
    chain: 'moonbeam',
    token: 'ACA',
    isNative: false,
    existentialDeposit: '100000000000',
    tokenIdent: '',
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'moonbeam',
    token: 'AUSD',
    isNative: false,
    existentialDeposit: '100000000000',
    tokenIdent: '',
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'moonbeam',
    token: 'LDOT',
    isNative: false,
    existentialDeposit: '500000000',
    tokenIdent: '',
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
]

// TODO: Implement this
export const routes: RawData['routes'] = []
