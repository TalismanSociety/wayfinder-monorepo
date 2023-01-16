import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  {
    chain: 'astar',
    token: 'ASTR',
    isNative: true,
    existentialDeposit: '1000000',
    tokenIdent: '',
    chaindataId: 'astar-substrate-native-astr',
  },
  {
    chain: 'astar',
    token: 'ACA',
    isNative: false,
    existentialDeposit: '1',
    tokenIdent: '18446744073709551616',
    chaindataId: 'astar-substrate-assets-18446744073709551616-aca',
  },
  {
    chain: 'astar',
    token: 'AUSD',
    isNative: false,
    existentialDeposit: '1',
    tokenIdent: '18446744073709551617',
    chaindataId: 'astar-substrate-assets-18446744073709551617-ausd',
  },
  {
    chain: 'astar',
    token: 'LDOT',
    isNative: false,
    existentialDeposit: '1',
    tokenIdent: '18446744073709551618',
    chaindataId: 'astar-substrate-assets-18446744073709551618-ldot',
  },
]

const weightLimit = 'Unlimited'
export const routes: RawData['routes'] = [
  { to: 'acala', token: 'ASTR', feeToken: 'ASTR', fee: '9269600000000000', weightLimit },
  { to: 'acala', token: 'ACA', feeToken: 'ACA', fee: '9269600000', weightLimit },
  { to: 'acala', token: 'AUSD', feeToken: 'AUSD', fee: '2931921869', weightLimit },
  { to: 'acala', token: 'LDOT', feeToken: 'LDOT', fee: '31449750', weightLimit },
].map((route) => ({ from: 'astar', ...route }))
