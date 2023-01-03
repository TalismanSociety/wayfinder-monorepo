import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  {
    chain: 'kusama',
    token: 'KSM',
    isNative: true,
    existentialDeposit: '79999999',
    tokenIdent: '',
    chaindataId: 'kusama-substrate-native-ksm',
  },
]

const weightLimit = 'Unlimited'
export const routes: RawData['routes'] = [
  { to: 'karura', token: 'KSM', feeToken: 'KSM', fee: '71927964', weightLimit },
  { to: 'basilisk', token: 'KSM', feeToken: 'KSM', fee: '51618187', weightLimit },
  { to: 'statemine', token: 'KSM', feeToken: 'KSM', fee: '4000000000', weightLimit },
].map((route) => ({ from: 'kusama', ...route }))
