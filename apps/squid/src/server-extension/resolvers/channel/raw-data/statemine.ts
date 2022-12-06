import { BN } from '@polkadot/util'

import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  {
    chain: 'statemine',
    token: 'KSM',
    isNative: false,
    existentialDeposit: '79999999',
    tokenId: '',
  },
  {
    chain: 'statemine',
    token: 'RMRK',
    isNative: false,
    existentialDeposit: '100000000',
    tokenId: new BN(8).toString(),
  },
]

export const routes: RawData['routes'] = [
  {
    from: 'statemine',
    to: 'kusama',
    token: 'KSM',
    feeToken: 'KSM',
    fee: '106666660',
    weightLimit: 'Unlimited',
  },
  {
    from: 'statemine',
    to: 'karura',
    token: 'RMRK',
    feeToken: 'RMRK',
    fee: '6400000',
    weightLimit: 'Unlimited',
  },
]
