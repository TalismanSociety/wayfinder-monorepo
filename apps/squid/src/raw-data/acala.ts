import type { RawData } from './_types'

// To get acala tokenIdents:
//
//     import { ApiPromise, WsProvider } from '@polkadot/api'
//     import { Wallet } from '@acala-network/sdk/wallet'
//
//     const api = new ApiPromise({ provider: new WsProvider(['wss://acala-polkadot.api.onfinality.io/public-ws']) })
//     const wallet = new Wallet(api)
//
//     (await wallet.getToken('ACA')).toChainData()
//     (await wallet.getToken('INTR')).toChainData()
//     etc

export const chainTokens: RawData['chainTokens'] = [
  {
    chain: 'acala',
    token: 'ACA',
    isNative: true,
    existentialDeposit: '100000000000',
    tokenIdent: JSON.stringify({ Token: 'ACA' }),
    chaindataId: 'acala-substrate-native-aca',
  },
  {
    chain: 'acala',
    token: 'AUSD',
    isNative: false,
    existentialDeposit: '100000000000',
    tokenIdent: JSON.stringify({ Token: 'AUSD' }),
    chaindataId: 'acala-substrate-orml-ausd',
  },
  {
    chain: 'acala',
    token: 'LDOT',
    isNative: false,
    existentialDeposit: '500000000',
    tokenIdent: JSON.stringify({ Token: 'LDOT' }),
    chaindataId: 'acala-substrate-orml-ldot',
  },
  {
    chain: 'acala',
    token: 'INTR',
    isNative: false,
    existentialDeposit: '1000000000',
    tokenIdent: JSON.stringify({ ForeignAsset: 4 }),
    chaindataId: 'acala-substrate-tokens-intr',
  },
  {
    chain: 'acala',
    token: 'IBTC',
    isNative: false,
    existentialDeposit: '100',
    tokenIdent: JSON.stringify({ ForeignAsset: 3 }),
    chaindataId: 'acala-substrate-tokens-ibtc',
  },
  {
    chain: 'acala',
    token: 'GLMR',
    isNative: false,
    existentialDeposit: '100000000000000000',
    tokenIdent: JSON.stringify({ ForeignAsset: 0 }),
    chaindataId: 'acala-substrate-tokens-glmr',
  },
  {
    chain: 'acala',
    token: 'PARA',
    isNative: false,
    existentialDeposit: '100000000000',
    tokenIdent: JSON.stringify({ ForeignAsset: 1 }),
    chaindataId: 'acala-substrate-tokens-para',
  },
  {
    chain: 'acala',
    token: 'ASTR',
    isNative: false,
    existentialDeposit: '100000000000000000',
    tokenIdent: JSON.stringify({ ForeignAsset: 2 }),
    chaindataId: 'acala-substrate-tokens-astr',
  },
  {
    chain: 'acala',
    token: 'DOT',
    isNative: false,
    existentialDeposit: '100000000',
    tokenIdent: JSON.stringify({ Token: 'DOT' }),
    // chaindataId: 'acala-substrate-tokens-dot', // TODO: Switch to this once on updated balance modules
    chaindataId: 'acala-substrate-orml-dot',
  },
]

const weightLimit = '5000000000'
export const routes: RawData['routes'] = [
  { to: 'polkadot', token: 'DOT', feeToken: 'DOT', fee: '469417452', weightLimit },
  { to: 'moonbeam', token: 'GLMR', feeToken: 'GLMR', fee: '8000000000000000', weightLimit },
  { to: 'moonbeam', token: 'ACA', feeToken: 'ACA', fee: '24963428577', weightLimit },
  { to: 'moonbeam', token: 'AUSD', feeToken: 'AUSD', fee: '2000000000', weightLimit },
  { to: 'parallel', token: 'PARA', feeToken: 'PARA', fee: '9600000000', weightLimit },
  { to: 'parallel', token: 'ACA', feeToken: 'ACA', fee: '1920000000', weightLimit },
  { to: 'parallel', token: 'AUSD', feeToken: 'AUSD', fee: '2880000000', weightLimit },
  { to: 'parallel', token: 'LDOT', feeToken: 'LDOT', fee: '96000000', weightLimit },
  { to: 'astar', token: 'ASTR', feeToken: 'ASTR', fee: '4635101624603120', weightLimit },
  { to: 'astar', token: 'ACA', feeToken: 'ACA', fee: '1108000000', weightLimit },
  { to: 'astar', token: 'AUSD', feeToken: 'AUSD', fee: '252800000', weightLimit },
  { to: 'astar', token: 'LDOT', feeToken: 'LDOT', fee: '3692000', weightLimit },
  { to: 'interlay', token: 'INTR', feeToken: 'INTR', fee: '21787589', weightLimit },
  { to: 'interlay', token: 'IBTC', feeToken: 'IBTC', fee: '72', weightLimit },
].map((route) => ({ from: 'acala', ...route }))
