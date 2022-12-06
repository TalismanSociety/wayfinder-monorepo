import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  {
    chain: 'polkadot',
    token: 'DOT',
    isNative: true,
    existentialDeposit: '10000000000',
    tokenId: '',
  },
]

export const routes: RawData['routes'] = [
  {
    from: 'polkadot',
    to: 'acala',
    token: 'DOT',
    feeToken: 'DOT',
    fee: '3549633',
    weightLimit: 'Unlimited',
  },
]
