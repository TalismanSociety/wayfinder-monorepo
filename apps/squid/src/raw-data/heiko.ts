import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  // TODO: Check that tokenIdent works as a string (otherwise it will need to be an integer)
  // As a reference:
  // https://github.com/polkawallet-io/bridge/blob/b0695fd335772f22c652dabedff92686e4e0d7a1/src/adapters/parallel.ts#L110-L119
  { chain: 'heiko', token: 'HKO', isNative: true, existentialDeposit: '100000000000', tokenIdent: '0' },
  { chain: 'heiko', token: 'KAR', isNative: false, existentialDeposit: '0', tokenIdent: '107' },
  { chain: 'heiko', token: 'KUSD', isNative: false, existentialDeposit: '0', tokenIdent: '103' },
  { chain: 'heiko', token: 'LKSM', isNative: false, existentialDeposit: '0', tokenIdent: '109' },
]

const weightLimit = '5000000000'
export const routes: RawData['routes'] = [
  { to: 'karura', token: 'HKO', feeToken: 'HKO', fee: '6400000000', weightLimit },
  { to: 'karura', token: 'KAR', feeToken: 'KAR', fee: '6400000000', weightLimit },
  { to: 'karura', token: 'KUSD', feeToken: 'KUSD', fee: '8305746640', weightLimit },
  { to: 'karura', token: 'LKSM', feeToken: 'LKSM', fee: '589618748', weightLimit },
].map((route) => ({ from: 'heiko', ...route }))
