import type { RawData } from './_types'

// To get karura tokenIdents:
//
//     import { ApiPromise, WsProvider } from '@polkadot/api'
//     import { Wallet } from '@acala-network/sdk/wallet'
//
//     const api = new ApiPromise({ provider: new WsProvider(['wss://karura.api.onfinality.io/public-ws']) })
//     const wallet = new Wallet(api)
//
//     (await wallet.getToken('KAR')).toChainData()
//     (await wallet.getToken('AUSD')).toChainData()
//     etc

export const chainTokens: RawData['chainTokens'] = [
  {
    chain: 'karura',
    token: 'KAR',
    isNative: true,
    existentialDeposit: '100000000000',
    tokenIdent: JSON.stringify({ Token: 'KAR' }),
    chaindataId: 'karura-substrate-native-kar',
  },
  {
    chain: 'karura',
    token: 'KUSD',
    isNative: false,
    existentialDeposit: '10000000000',
    tokenIdent: JSON.stringify({ Token: 'KUSD' }),
    chaindataId: 'karura-substrate-orml-kusd',
  },
  {
    chain: 'karura',
    token: 'LKSM',
    isNative: false,
    existentialDeposit: '500000000',
    tokenIdent: JSON.stringify({ Token: 'LKSM' }),
    chaindataId: 'karura-substrate-orml-lksm',
  },
  {
    chain: 'karura',
    token: 'SDN',
    isNative: false,
    existentialDeposit: '10000000000000000',
    tokenIdent: JSON.stringify({ ForeignAsset: 18 }),
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'karura',
    token: 'BNC',
    isNative: false,
    existentialDeposit: '8000000000',
    tokenIdent: JSON.stringify({ Token: 'BNC' }),
    chaindataId: 'karura-substrate-orml-bnc',
  },
  {
    chain: 'karura',
    token: 'VSKSM',
    isNative: false,
    existentialDeposit: '100000000',
    tokenIdent: JSON.stringify({ Token: 'VSKSM' }),
    chaindataId: 'karura-substrate-orml-vsksm',
  },
  {
    chain: 'karura',
    token: 'AIR',
    isNative: false,
    existentialDeposit: '100000000000000000',
    tokenIdent: JSON.stringify({ ForeignAsset: 12 }),
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'karura',
    token: 'CSM',
    isNative: false,
    existentialDeposit: '1000000000000',
    tokenIdent: JSON.stringify({ ForeignAsset: 5 }),
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'karura',
    token: 'CRAB',
    isNative: false,
    existentialDeposit: '1000000000000000000',
    tokenIdent: JSON.stringify({ ForeignAsset: 13 }),
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'karura',
    token: 'BSX',
    isNative: false,
    existentialDeposit: '1000000000000',
    tokenIdent: JSON.stringify({ ForeignAsset: 11 }),
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'karura',
    token: 'TEER',
    isNative: false,
    existentialDeposit: '100000000000',
    tokenIdent: JSON.stringify({ ForeignAsset: 8 }),
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'karura',
    token: 'KINT',
    isNative: false,
    existentialDeposit: '133330000',
    tokenIdent: JSON.stringify({ Token: 'KINT' }),
    chaindataId: 'karura-substrate-orml-kint',
  },
  {
    chain: 'karura',
    token: 'KBTC',
    isNative: false,
    existentialDeposit: '66',
    tokenIdent: JSON.stringify({ Token: 'KBTC' }),
    chaindataId: 'karura-substrate-orml-kbtc',
  },
  {
    chain: 'karura',
    token: 'KICO',
    isNative: false,
    existentialDeposit: '100000000000000',
    tokenIdent: JSON.stringify({ ForeignAsset: 6 }),
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'karura',
    token: 'PCHU',
    isNative: false,
    existentialDeposit: '100000000000000000',
    tokenIdent: JSON.stringify({ ForeignAsset: 17 }),
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'karura',
    token: 'LT',
    isNative: false,
    existentialDeposit: '1000000000000',
    tokenIdent: JSON.stringify({ ForeignAsset: 19 }),
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'karura',
    token: 'KMA',
    isNative: false,
    existentialDeposit: '100000000000',
    tokenIdent: JSON.stringify({ ForeignAsset: 10 }),
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'karura',
    token: 'MOVR',
    isNative: false,
    existentialDeposit: '1000000000000000',
    tokenIdent: JSON.stringify({ ForeignAsset: 3 }),
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'karura',
    token: 'TUR',
    isNative: false,
    existentialDeposit: '40000000000',
    tokenIdent: JSON.stringify({ ForeignAsset: 16 }),
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'karura',
    token: 'HKO',
    isNative: false,
    existentialDeposit: '100000000000',
    tokenIdent: JSON.stringify({ ForeignAsset: 4 }),
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'karura',
    token: 'PHA',
    isNative: false,
    existentialDeposit: '40000000000',
    tokenIdent: JSON.stringify({ Token: 'PHA' }),
    chaindataId: 'karura-substrate-orml-pha',
  },
  {
    chain: 'karura',
    token: 'KSM',
    isNative: false,
    existentialDeposit: '100000000',
    tokenIdent: JSON.stringify({ Token: 'KSM' }),
    chaindataId: 'karura-substrate-orml-ksm',
  },
  {
    chain: 'karura',
    token: 'RMRK',
    isNative: false,
    existentialDeposit: '100000000',
    tokenIdent: JSON.stringify({ ForeignAsset: 0 }),
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'karura',
    token: 'ARIS',
    isNative: false,
    existentialDeposit: '1000000000000',
    tokenIdent: JSON.stringify({ ForeignAsset: 1 }),
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'karura',
    token: 'USDT',
    isNative: false,
    existentialDeposit: '1000',
    tokenIdent: JSON.stringify({ ForeignAsset: 7 }),
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
  {
    chain: 'karura',
    token: 'QTZ',
    isNative: false,
    existentialDeposit: '40000000000',
    tokenIdent: JSON.stringify({ ForeignAsset: 2 }),
    chaindataId: '', // TODO: Implement this token in @talismn/balances
  },
]

const weightLimit = '5000000000'
export const routes: RawData['routes'] = [
  { to: 'kusama', token: 'KSM', feeToken: 'KSM', fee: '79999999', weightLimit },
  { to: 'statemine', token: 'RMRK', feeToken: 'KSM', fee: '16000000000', weightLimit },
  { to: 'statemine', token: 'ARIS', feeToken: 'KSM', fee: '16000000000', weightLimit },
  { to: 'statemine', token: 'USDT', feeToken: 'KSM', fee: '16000000000', weightLimit },
  { to: 'shiden', token: 'SDN', feeToken: 'SDN', fee: '4662276356431024', weightLimit },
  { to: 'shiden', token: 'KUSD', feeToken: 'KUSD', fee: '1200000000', weightLimit },
  { to: 'bifrost', token: 'BNC', feeToken: 'BNC', fee: '5120000000', weightLimit },
  { to: 'bifrost', token: 'KAR', feeToken: 'KAR', fee: '4800000000', weightLimit },
  { to: 'bifrost', token: 'KUSD', feeToken: 'KUSD', fee: '25600000000', weightLimit },
  { to: 'bifrost', token: 'VSKSM', feeToken: 'VSKSM', fee: '64000000', weightLimit },
  { to: 'altair', token: 'AIR', feeToken: 'AIR', fee: '6400000000000000', weightLimit },
  { to: 'altair', token: 'KUSD', feeToken: 'KUSD', fee: '51200000000', weightLimit },
  { to: 'shadow', token: 'CSM', feeToken: 'CSM', fee: '4000000000', weightLimit },
  { to: 'shadow', token: 'KAR', feeToken: 'KAR', fee: '4000', weightLimit },
  { to: 'shadow', token: 'KUSD', feeToken: 'KUSD', fee: '4000', weightLimit },
  { to: 'crab', token: 'CRAB', feeToken: 'CRAB', fee: '4000000000', weightLimit },
  { to: 'integritee', token: 'TEER', feeToken: 'TEER', fee: '4000000', weightLimit },
  { to: 'kintsugi', token: 'KINT', feeToken: 'KINT', fee: '170666666', weightLimit },
  { to: 'kintsugi', token: 'KBTC', feeToken: 'KBTC', fee: '85', weightLimit },
  { to: 'kintsugi', token: 'LKSM', feeToken: 'LKSM', fee: '186480000', weightLimit },
  { to: 'khala', token: 'PHA', feeToken: 'PHA', fee: '64000000000', weightLimit },
  { to: 'khala', token: 'KUSD', feeToken: 'KUSD', fee: '16000000000', weightLimit },
  { to: 'khala', token: 'KAR', feeToken: 'KAR', fee: '8000000000', weightLimit },
  { to: 'kico', token: 'KICO', feeToken: 'KICO', fee: '96000000000', weightLimit },
  { to: 'kico', token: 'KAR', feeToken: 'KAR', fee: '160000000000', weightLimit },
  { to: 'kico', token: 'KUSD', feeToken: 'KUSD', fee: '320000000000', weightLimit },
  { to: 'calamari', token: 'KMA', feeToken: 'KMA', fee: '4000000', weightLimit },
  { to: 'calamari', token: 'KUSD', feeToken: 'KUSD', fee: '100000000000', weightLimit },
  { to: 'calamari', token: 'KAR', feeToken: 'KAR', fee: '100000000000', weightLimit },
  { to: 'calamari', token: 'LKSM', feeToken: 'LKSM', fee: '7692307692', weightLimit },
  { to: 'moonriver', token: 'MOVR', feeToken: 'MOVR', fee: '80000000000000', weightLimit },
  { to: 'moonriver', token: 'KAR', feeToken: 'KAR', fee: '9880000000', weightLimit },
  { to: 'moonriver', token: 'KUSD', feeToken: 'KUSD', fee: '16536000000', weightLimit },
  { to: 'heiko', token: 'HKO', feeToken: 'HKO', fee: '1440000000', weightLimit },
  { to: 'heiko', token: 'KAR', feeToken: 'KAR', fee: '2400000000', weightLimit },
  { to: 'heiko', token: 'KUSD', feeToken: 'KUSD', fee: '19200000000', weightLimit },
  { to: 'heiko', token: 'LKSM', feeToken: 'LKSM', fee: '48000000', weightLimit },
  { to: 'pichiu', token: 'PCHU', feeToken: 'PCHU', fee: '400000000000000', weightLimit },
  { to: 'pichiu', token: 'KAR', feeToken: 'KAR', fee: '400000000', weightLimit },
  { to: 'pichiu', token: 'KUSD', feeToken: 'KUSD', fee: '400000000', weightLimit },
  { to: 'pichiu', token: 'LKSM', feeToken: 'LKSM', fee: '400000000', weightLimit },
  { to: 'turing', token: 'TUR', feeToken: 'TUR', fee: '1664000000', weightLimit },
  { to: 'turing', token: 'KAR', feeToken: 'KAR', fee: '32000000000', weightLimit },
  { to: 'turing', token: 'KUSD', feeToken: 'KUSD', fee: '256000000000', weightLimit },
  { to: 'turing', token: 'LKSM', feeToken: 'LKSM', fee: '6400000000', weightLimit },
  { to: 'basilisk', token: 'BSX', feeToken: 'BSX', fee: '22000000000000', weightLimit },
  { to: 'basilisk', token: 'KUSD', feeToken: 'KUSD', fee: '3150402683', weightLimit },
  { to: 'listen', token: 'LT', feeToken: 'LT', fee: '6400000000', weightLimit },
  { to: 'listen', token: 'KAR', feeToken: 'KAR', fee: '6400000000', weightLimit },
  { to: 'listen', token: 'KUSD', feeToken: 'KUSD', fee: '6400000000', weightLimit },
  { to: 'listen', token: 'LKSM', feeToken: 'LKSM', fee: '6400000000', weightLimit },
  { to: 'quartz', token: 'QTZ', feeToken: 'QTZ', fee: '0', weightLimit },
].map((route) => ({ from: 'karura', ...route }))
