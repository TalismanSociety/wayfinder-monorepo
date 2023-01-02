import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  { chain: 'integritee', token: 'TEER', isNative: true, existentialDeposit: '100000000000', tokenIdent: '' },
]

const weightLimit = '5000000000'
export const routes: RawData['routes'] = [
  { to: 'karura', token: 'TEER', feeToken: 'TEER', fee: '6400000000', weightLimit },
].map((route) => ({ from: 'integritee', ...route }))
