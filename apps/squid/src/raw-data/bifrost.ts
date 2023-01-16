import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  {
    chain: 'bifrost',
    token: 'BNC',
    isNative: true,
    existentialDeposit: '10000000000',
    tokenIdent: JSON.stringify({ Native: 'BNC' }),
    chaindataId: 'bifrost-kusama-substrate-native-bnc',
  },
  {
    chain: 'bifrost',
    token: 'VSKSM',
    isNative: false,
    existentialDeposit: '100000000',
    tokenIdent: JSON.stringify({ VSToken: 'KSM' }),
    chaindataId: 'bifrost-kusama-substrate-tokens-vsksm',
  },
  {
    chain: 'bifrost',
    token: 'KSM',
    isNative: false,
    existentialDeposit: '100000000',
    tokenIdent: JSON.stringify({ Token: 'KSM' }),
    chaindataId: 'bifrost-kusama-substrate-orml-ksm',
  },
  {
    chain: 'bifrost',
    token: 'KAR',
    isNative: false,
    existentialDeposit: '148000000',
    tokenIdent: JSON.stringify({ Token: 'KAR' }),
    chaindataId: 'bifrost-kusama-substrate-orml-kar',
  },
  {
    chain: 'bifrost',
    token: 'KUSD',
    isNative: false,
    existentialDeposit: '100000000',
    tokenIdent: JSON.stringify({ Stable: 'KUSD' }),
    // TODO: Check that this tracks the correct balance
    // (`{ Stable: 'KUSD' }` vs `{ Token: 'KUSD' }`)
    // if not, switch to `bifrost-kusama-substrate-tokens-ausd`
    chaindataId: 'bifrost-kusama-substrate-orml-kusd',
  },
]

const weightLimit = '5000000000'
export const routes: RawData['routes'] = [
  { to: 'karura', token: 'BNC', feeToken: 'BNC', fee: '5120000000', weightLimit },
  { to: 'karura', token: 'VSKSM', feeToken: 'VSKSM', fee: '64000000', weightLimit },
  { to: 'karura', token: 'KSM', feeToken: 'KSM', fee: '64000000', weightLimit },
  { to: 'karura', token: 'KAR', feeToken: 'KAR', fee: '6400000000', weightLimit },
  { to: 'karura', token: 'KUSD', feeToken: 'KUSD', fee: '10011896008', weightLimit },
].map((route) => ({ from: 'bifrost', ...route }))
