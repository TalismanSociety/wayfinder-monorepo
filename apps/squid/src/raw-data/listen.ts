import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  // TODO: Check that tokenIdent works as a string (otherwise it will need to be an integer)
  // As a reference:
  // https://github.com/polkawallet-io/bridge/blob/b0695fd335772f22c652dabedff92686e4e0d7a1/src/adapters/listen.ts#L64-L69
  { chain: 'listen', token: 'LT', isNative: true, existentialDeposit: '500000000000', tokenIdent: '0' },
  { chain: 'listen', token: 'KAR', isNative: false, existentialDeposit: '100000000000', tokenIdent: '128' },
  { chain: 'listen', token: 'KUSD', isNative: false, existentialDeposit: '10000000000', tokenIdent: '129' },
  { chain: 'listen', token: 'LKSM', isNative: false, existentialDeposit: '500000000', tokenIdent: '131' },
]

const weightLimit = '5000000000'
export const routes: RawData['routes'] = [
  { to: 'karura', token: 'LT', feeToken: 'LT', fee: '93240000000', weightLimit },
  { to: 'karura', token: 'KAR', feeToken: 'KAR', fee: '9324000000', weightLimit },
  { to: 'karura', token: 'KUSD', feeToken: 'KUSD', fee: '5693632140', weightLimit },
  { to: 'karura', token: 'LKSM', feeToken: 'LKSM', fee: '739331668', weightLimit },
].map((route) => ({ from: 'listen', ...route }))
