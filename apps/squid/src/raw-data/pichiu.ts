import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  {
    chain: 'pichiu',
    token: 'PCHU',
    isNative: false,
    existentialDeposit: '1000000000000',
    tokenIdent: 'PCHU',
    chaindataId: 'pichiu-substrate-native-pchu',
  },
  {
    chain: 'pichiu',
    token: 'KAR',
    isNative: false,
    existentialDeposit: '100000000000',
    tokenIdent: 'KAR',
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'pichiu',
    token: 'KUSD',
    isNative: false,
    existentialDeposit: '10000000000',
    tokenIdent: 'KUSD',
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'pichiu',
    token: 'LKSM',
    isNative: false,
    existentialDeposit: '500000000',
    tokenIdent: 'LKSM',
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
]

const weightLimit = '5000000000'
export const routes: RawData['routes'] = [
  { to: 'karura', token: 'PCHU', feeToken: 'PCHU', fee: '9324000000000000', weightLimit },
  { to: 'karura', token: 'KAR', feeToken: 'KAR', fee: '9324000000', weightLimit },
  { to: 'karura', token: 'KUSD', feeToken: 'KUSD', fee: '5060238106', weightLimit },
  { to: 'karura', token: 'LKSM', feeToken: 'LKSM', fee: '700170039', weightLimit },
].map((route) => ({ from: 'pichiu', ...route }))
