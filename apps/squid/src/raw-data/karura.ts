import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  {
    chain: 'karura',
    token: 'KAR',
    isNative: true,
    existentialDeposit: '100000000000',
    tokenIdent: JSON.stringify({ Token: 'KAR' }),
  },
  {
    chain: 'karura',
    token: 'AUSD',
    isNative: false,
    existentialDeposit: '10000000000',
    tokenIdent: JSON.stringify({ Token: 'KUSD' }),
  },
  {
    chain: 'karura',
    token: 'BNC',
    isNative: false,
    existentialDeposit: '8000000000',
    tokenIdent: JSON.stringify({ Token: 'BNC' }),
  },
  {
    chain: 'karura',
    token: 'KSM',
    isNative: false,
    existentialDeposit: '100000000',
    tokenIdent: JSON.stringify({ Token: 'KSM' }),
  },
  {
    chain: 'karura',
    token: 'RMRK',
    isNative: false,
    existentialDeposit: '100000000',
    tokenIdent: JSON.stringify({ Token: 'RMRK' }),
  },
]

export const routes: RawData['routes'] = [
  {
    from: 'karura',
    to: 'kusama',
    token: 'KSM',
    feeToken: 'KSM',
    fee: '79999999',
    weightLimit: '5000000000',
  },
  {
    from: 'karura',
    to: 'statemine',
    token: 'RMRK',
    feeToken: 'KSM',
    fee: '16000000000',
    weightLimit: '5000000000',
  },
  {
    from: 'karura',
    to: 'bifrost',
    token: 'BNC',
    feeToken: 'BNC',
    fee: '5120000000',
    weightLimit: '5000000000',
  },
  {
    from: 'karura',
    to: 'bifrost',
    token: 'KAR',
    feeToken: 'KAR',
    fee: '4800000000',
    weightLimit: '5000000000',
  },
  {
    from: 'karura',
    to: 'bifrost',
    token: 'AUSD',
    feeToken: 'AUSD',
    fee: '25600000000',
    weightLimit: '5000000000',
  },
]
