import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  // TODO: Check that tokenIdent works as a string (otherwise it will need to be an integer)
  // As a reference:
  // https://github.com/polkawallet-io/bridge/blob/b0695fd335772f22c652dabedff92686e4e0d7a1/src/adapters/manta.ts#L73-L79
  {
    chain: 'calamari',
    token: 'KMA',
    isNative: true,
    existentialDeposit: '100000000000',
    tokenIdent: '1',
    chaindataId: 'calamari-substrate-native-kma',
  },
  {
    chain: 'calamari',
    token: 'KAR',
    isNative: false,
    existentialDeposit: '100000000000',
    tokenIdent: '8',
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'calamari',
    token: 'KUSD',
    isNative: false,
    existentialDeposit: '10000000000',
    tokenIdent: '9',
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'calamari',
    token: 'LKSM',
    isNative: false,
    existentialDeposit: '500000000',
    tokenIdent: '10',
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'calamari',
    token: 'KSM',
    isNative: false,
    existentialDeposit: '100000000',
    tokenIdent: '12',
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
]

const weightLimit = '5000000000'
export const routes: RawData['routes'] = [
  { to: 'karura', token: 'KMA', feeToken: 'KMA', fee: '6400000000', weightLimit },
  { to: 'karura', token: 'KUSD', feeToken: 'KUSD', fee: '6381112603', weightLimit },
  { to: 'karura', token: 'KAR', feeToken: 'KAR', fee: '6400000000', weightLimit },
  { to: 'karura', token: 'LKSM', feeToken: 'LKSM', fee: '452334406', weightLimit },
  { to: 'karura', token: 'KSM', feeToken: 'KSM', fee: '54632622', weightLimit },
].map((route) => ({ from: 'calamari', ...route }))
