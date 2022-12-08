import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  {
    chain: 'acala',
    token: 'ACA',
    isNative: true,
    existentialDeposit: '100000000000',
    tokenIdent: JSON.stringify({ Token: 'ACA' }),
  },
  {
    chain: 'acala',
    token: 'AUSD',
    isNative: false,
    existentialDeposit: '100000000000',
    tokenIdent: JSON.stringify({ Token: 'AUSD' }),
  },
  {
    chain: 'acala',
    token: 'DOT',
    isNative: false,
    existentialDeposit: '100000000',
    tokenIdent: JSON.stringify({ Token: 'DOT' }),
  },
]

export const routes: RawData['routes'] = [
  {
    from: 'acala',
    to: 'polkadot',
    token: 'DOT',
    feeToken: 'DOT',
    fee: '469417452',
    weightLimit: '5000000000',
  },
]
