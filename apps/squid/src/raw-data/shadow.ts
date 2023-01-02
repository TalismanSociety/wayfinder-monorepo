import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  { chain: 'shadow', token: 'CSM', isNative: true, existentialDeposit: '100000000000', tokenIdent: '' },
  {
    chain: 'shadow',
    token: 'KAR',
    isNative: false,
    existentialDeposit: '1',
    tokenIdent: '10810581592933651521121702237638664357',
  },
  {
    chain: 'shadow',
    token: 'KUSD',
    isNative: false,
    existentialDeposit: '1',
    tokenIdent: '214920334981412447805621250067209749032',
  },
]

const weightLimit = '5000000000'
export const routes: RawData['routes'] = [
  { to: 'karura', token: 'CSM', feeToken: 'CSM', fee: '64000000000', weightLimit },
  { to: 'karura', token: 'KAR', feeToken: 'KAR', fee: '9324000000', weightLimit },
  { to: 'karura', token: 'KUSD', feeToken: 'KUSD', fee: '5693632140', weightLimit },
].map((route) => ({ from: 'shadow', ...route }))
