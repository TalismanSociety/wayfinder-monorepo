import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  {
    chain: 'polkadot',
    token: 'DOT',
    isNative: true,
    existentialDeposit: '10000000000',
    tokenIdent: '',
    chaindataId: 'polkadot-substrate-native-dot',
  },
]

const weightLimit = 'Unlimited'
export const routes: RawData['routes'] = [
  { to: 'acala', token: 'DOT', feeToken: 'DOT', fee: '3549633', weightLimit },
].map((route) => ({ from: 'polkadot', ...route }))
