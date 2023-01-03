import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  // TODO: Check that tokenIdent works as a string (otherwise it will need to be an integer)
  // As a reference:
  // https://github.com/polkawallet-io/bridge/blob/b0695fd335772f22c652dabedff92686e4e0d7a1/src/adapters/parallel.ts#L110-L119
  {
    chain: 'parallel',
    token: 'PARA',
    isNative: true,
    existentialDeposit: '100000000000',
    tokenIdent: '1',
    chaindataId: 'parallel-substrate-native-para',
  },
  {
    chain: 'parallel',
    token: 'ACA',
    isNative: false,
    existentialDeposit: '100000000000',
    tokenIdent: '108',
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'parallel',
    token: 'AUSD',
    isNative: false,
    existentialDeposit: '100000000000',
    tokenIdent: '104',
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'parallel',
    token: 'LDOT',
    isNative: false,
    existentialDeposit: '500000000',
    tokenIdent: '110',
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
]

const weightLimit = '5000000000'
export const routes: RawData['routes'] = [
  { to: 'acala', token: 'PARA', feeToken: 'PARA', fee: '6400000000', weightLimit },
  { to: 'acala', token: 'ACA', feeToken: 'ACA', fee: '6400000000', weightLimit },
  { to: 'acala', token: 'AUSD', feeToken: 'AUSD', fee: '3721109059', weightLimit },
  { to: 'acala', token: 'LDOT', feeToken: 'LDOT', fee: '24037893', weightLimit },
].map((route) => ({ from: 'parallel', ...route }))
