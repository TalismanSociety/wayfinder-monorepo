import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  // TODO: Check that tokenIdent works as a string (otherwise it will need to be an integer)
  // As a reference:
  // https://github.com/polkawallet-io/bridge/blob/b0695fd335772f22c652dabedff92686e4e0d7a1/src/adapters/phala.ts#L104-L107
  { chain: 'khala', token: 'PHA', isNative: false, existentialDeposit: '40000000000', tokenIdent: '' },
  { chain: 'khala', token: 'KAR', isNative: false, existentialDeposit: '10000000000', tokenIdent: '1' },
  { chain: 'khala', token: 'KUSD', isNative: false, existentialDeposit: '10000000000', tokenIdent: '4' },
]

const weightLimit = '5000000000'
export const routes: RawData['routes'] = [
  { to: 'karura', token: 'PHA', feeToken: 'PHA', fee: '51200000000', weightLimit },
  { to: 'karura', token: 'KUSD', feeToken: 'KUSD', fee: '4616667257', weightLimit },
  { to: 'karura', token: 'KAR', feeToken: 'KAR', fee: '6400000000', weightLimit },
].map((route) => ({ from: 'khala', ...route }))
