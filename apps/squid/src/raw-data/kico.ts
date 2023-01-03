import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  // TODO: Check that tokenIdent works as a string (otherwise it will need to be an integer)
  // As a reference:
  // https://github.com/polkawallet-io/bridge/blob/b0695fd335772f22c652dabedff92686e4e0d7a1/src/adapters/kico.ts#L55-L59
  {
    chain: 'kico',
    token: 'KICO',
    isNative: true,
    existentialDeposit: '100000000000000',
    tokenIdent: '0',
    chaindataId: 'kico-substrate-native-kico',
  },
  {
    chain: 'kico',
    token: 'KAR',
    isNative: false,
    existentialDeposit: '0',
    tokenIdent: '102',
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'kico',
    token: 'KUSD',
    isNative: false,
    existentialDeposit: '0',
    tokenIdent: '10',
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
]

const weightLimit = '5000000000'
export const routes: RawData['routes'] = [
  { to: 'karura', token: 'KICO', feeToken: 'KICO', fee: '6400000000000', weightLimit },
  { to: 'karura', token: 'KAR', feeToken: 'KAR', fee: '6400000000', weightLimit },
  { to: 'karura', token: 'KUSD', feeToken: 'KUSD', fee: '10011896008', weightLimit },
].map((route) => ({ from: 'kico', ...route }))
