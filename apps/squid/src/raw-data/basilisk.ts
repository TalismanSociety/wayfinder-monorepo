import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  // TODO: Check that tokenIdent works as a string (otherwise it will need to be an integer)
  // As a reference:
  // https://github.com/polkawallet-io/bridge/blob/b0695fd335772f22c652dabedff92686e4e0d7a1/src/adapters/hydradx.ts#L63-L67
  {
    chain: 'basilisk',
    token: 'BSX',
    isNative: true,
    existentialDeposit: '1000000000000',
    tokenIdent: '0',
    chaindataId: 'basilisk-substrate-native-bsx',
  },
  {
    chain: 'basilisk',
    token: 'KUSD',
    isNative: false,
    existentialDeposit: '10000000000',
    tokenIdent: '2',
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'basilisk',
    token: 'KSM',
    isNative: false,
    existentialDeposit: '100000000',
    tokenIdent: '1',
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
]

const weightLimit = '5000000000'
export const routes: RawData['routes'] = [
  { to: 'kusama', token: 'KSM', feeToken: 'KSM', fee: '11523248', weightLimit: '800000000' },
  { to: 'karura', token: 'BSX', feeToken: 'BSX', fee: '93240000000', weightLimit },
  { to: 'karura', token: 'KUSD', feeToken: 'KUSD', fee: '5060238106', weightLimit },
  { to: 'karura', token: 'KSM', feeToken: 'KSM', fee: '90741527', weightLimit },
].map((route) => ({ from: 'basilisk', ...route }))
