import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  {
    chain: 'bifrost',
    token: 'BNC',
    isNative: true,
    existentialDeposit: '10000000000',
    tokenId: JSON.stringify({ Native: 'BNC' }),
  },
  {
    chain: 'bifrost',
    token: 'KSM',
    isNative: false,
    existentialDeposit: '100000000',
    tokenId: JSON.stringify({ Token: 'KSM' }),
  },
  {
    chain: 'bifrost',
    token: 'KAR',
    isNative: false,
    existentialDeposit: '148000000',
    tokenId: JSON.stringify({ Token: 'KAR' }),
  },
  {
    chain: 'bifrost',
    token: 'AUSD',
    isNative: false,
    existentialDeposit: '100000000',
    tokenId: JSON.stringify({ Stable: 'KUSD' }),
  },
]

export const routes: RawData['routes'] = [
  {
    from: 'bifrost',
    to: 'karura',
    token: 'BNC',
    feeToken: 'BNC',
    fee: '5120000000',
    weightLimit: '5000000000',
  },
  {
    from: 'bifrost',
    to: 'karura',
    token: 'KSM',
    feeToken: 'KSM',
    fee: '64000000',
    weightLimit: '5000000000',
  },
  {
    from: 'bifrost',
    to: 'karura',
    token: 'KAR',
    feeToken: 'KAR',
    fee: '6400000000',
    weightLimit: '5000000000',
  },
  {
    from: 'bifrost',
    to: 'karura',
    token: 'AUSD',
    feeToken: 'AUSD',
    fee: '10011896008',
    weightLimit: '5000000000',
  },
]
