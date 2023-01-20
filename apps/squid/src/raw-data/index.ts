import { githubChainLogoUrl, githubTokenLogoUrl } from '@talismn/chaindata-provider'

import type { RawData } from './_types'
import * as acala from './acala'
import * as altair from './altair'
import * as astar from './astar'
import * as basilisk from './basilisk'
import * as bifrost from './bifrost'
import * as calamari from './calamari'
import * as crab from './crab'
import * as heiko from './heiko'
import * as integritee from './integritee'
import * as interlay from './interlay'
import * as karura from './karura'
import * as khala from './khala'
import * as kico from './kico'
import * as kintsugi from './kintsugi'
import * as kusama from './kusama'
import * as listen from './listen'
import * as moonbeam from './moonbeam'
import * as moonriver from './moonriver'
import * as parallel from './parallel'
import * as pichiu from './pichiu'
import * as polkadot from './polkadot'
import * as quartz from './quartz'
import * as shadow from './shadow'
import * as shiden from './shiden'
import * as statemine from './statemine'
import * as statemint from './statemint'
import * as turing from './turing'

const allChains = [
  // polkadot relaychain
  polkadot,
  statemint,
  acala,
  astar,
  interlay,
  moonbeam,
  parallel,

  // kusama relaychain
  kusama,
  statemine,
  karura,
  bifrost,
  shiden,
  altair,
  shadow,
  crab,
  basilisk,
  integritee,
  kintsugi,
  kico,
  pichiu,
  listen,
  calamari,
  moonriver,
  turing,
  heiko,
  khala,
  quartz,
]

export const rawData: RawData = {
  chains: {
    polkadot: { paraId: null, name: 'Polkadot', logo: githubChainLogoUrl('polkadot'), prefix: 0 },
    statemint: { paraId: 1000, name: 'Statemint', logo: githubChainLogoUrl('statemint'), prefix: 0 },
    acala: { paraId: 2000, name: 'Acala', logo: githubChainLogoUrl('acala'), prefix: 10 },
    astar: { paraId: 2006, name: 'Astar', logo: githubChainLogoUrl('astar'), prefix: 5 },
    interlay: { paraId: 2032, name: 'Interlay', logo: githubChainLogoUrl('interlay'), prefix: 2032 },
    moonbeam: { paraId: 2004, name: 'Moonbeam', logo: githubChainLogoUrl('moonbeam'), prefix: 1284 },
    parallel: { paraId: 2012, name: 'Parallel', logo: githubChainLogoUrl('parallel'), prefix: 172 },

    kusama: { paraId: null, name: 'Kusama', logo: githubChainLogoUrl('kusama'), prefix: 2 },
    statemine: { paraId: 1000, name: 'Statemine', logo: githubChainLogoUrl('statemine'), prefix: 2 },
    karura: { paraId: 2000, name: 'Karura', logo: githubChainLogoUrl('karura'), prefix: 8 },
    bifrost: { paraId: 2001, name: 'Bifrost', logo: githubChainLogoUrl('bifrost'), prefix: 6 },
    shiden: { paraId: 2007, name: 'Shiden', logo: githubChainLogoUrl('shiden-kusama'), prefix: 5 },
    altair: { paraId: 2088, name: 'Altair', logo: githubChainLogoUrl('altair'), prefix: 136 },
    shadow: { paraId: 2012, name: 'Crust Shadow', logo: githubChainLogoUrl('shadow-kusama'), prefix: 66 },
    crab: { paraId: 2105, name: 'Darwinia Crab', logo: githubChainLogoUrl('crab-kusama'), prefix: 42 },
    basilisk: { paraId: 2090, name: 'Basilisk', logo: githubChainLogoUrl('basilisk'), prefix: 10041 },
    integritee: { paraId: 2015, name: 'Integritee', logo: githubChainLogoUrl('integritee-kusama'), prefix: 13 },
    kintsugi: { paraId: 2092, name: 'Kintsugi', logo: githubChainLogoUrl('kintsugi'), prefix: 2092 },
    kico: { paraId: 2107, name: 'Kico', logo: githubChainLogoUrl('kico'), prefix: 42 },
    pichiu: { paraId: 2102, name: 'Pichiu', logo: githubChainLogoUrl('pichiu'), prefix: 42 },
    listen: { paraId: 2118, name: 'Listen', logo: githubChainLogoUrl('listen'), prefix: 42 },
    calamari: { paraId: 2084, name: 'Calamari', logo: githubChainLogoUrl('calamari'), prefix: 78 },
    moonriver: { paraId: 2023, name: 'Moonriver', logo: githubChainLogoUrl('moonriver'), prefix: 1285 },
    turing: { paraId: 2114, name: 'Turing', logo: githubChainLogoUrl('turing'), prefix: 51 },
    heiko: { paraId: 2085, name: 'Parallel Heiko', logo: githubChainLogoUrl('heiko-kusama'), prefix: 110 },
    khala: { paraId: 2004, name: 'Khala', logo: githubChainLogoUrl('khala'), prefix: 30 },
    quartz: { paraId: 2095, name: 'Quartz', logo: githubChainLogoUrl('quartz'), prefix: 255 },
  },

  rpcs: {
    polkadot: ['wss://polkadot.api.onfinality.io/public-ws'],
    statemint: ['wss://statemint.api.onfinality.io/public-ws'],
    acala: ['wss://acala-polkadot.api.onfinality.io/public-ws'],
    astar: ['wss://astar.api.onfinality.io/public-ws'],
    interlay: ['wss://interlay.api.onfinality.io/public-ws'],
    moonbeam: ['wss://moonbeam.api.onfinality.io/public-ws'],
    parallel: ['wss://rpc.parallel.fi'],

    kusama: ['wss://kusama.api.onfinality.io/public-ws'],
    statemine: ['wss://statemine.api.onfinality.io/public-ws'],
    karura: ['wss://karura.api.onfinality.io/public-ws'],
    bifrost: ['wss://bifrost-parachain.api.onfinality.io/public-ws'],
    shiden: ['wss://shiden.api.onfinality.io/public-ws'],
    altair: ['wss://altair.api.onfinality.io/public-ws'],
    shadow: ['wss://rpc-shadow.crust.network'],
    crab: ['wss://darwinia-crab.api.onfinality.io/public-ws'],
    basilisk: ['wss://rpc.basilisk.cloud'],
    integritee: ['wss://integritee-kusama.api.onfinality.io/public-ws'],
    kintsugi: ['wss://kintsugi.api.onfinality.io/public-ws'],
    kico: ['wss://rpc.kico.dico.io'],
    pichiu: ['wss://pichiu.api.onfinality.io/public-ws'],
    listen: ['wss://rpc.mainnet.listen.io'],
    calamari: ['wss://ws.calamari.systems'],
    moonriver: ['wss://moonriver.api.onfinality.io/public-ws'],
    turing: ['wss://rpc.turing.oak.tech'],
    heiko: ['wss://parallel-heiko.api.onfinality.io/public-ws'],
    khala: ['wss://khala.api.onfinality.io/public-ws'],
    quartz: ['wss://quartz.api.onfinality.io/public-ws'],
  },

  tokens: {
    ACA: { name: 'ACA', symbol: 'ACA', decimals: 12, logo: githubChainLogoUrl('acala') },
    AIR: { name: 'AIR', symbol: 'AIR', decimals: 18, logo: githubChainLogoUrl('altair') },
    ARIS: { name: 'ARIS', symbol: 'ARIS', decimals: 8, logo: githubTokenLogoUrl('karura-substrate-tokens-aris') },
    ASTR: { name: 'ASTR', symbol: 'ASTR', decimals: 18, logo: githubChainLogoUrl('astar') },
    AUSD: { name: 'AUSD', symbol: 'AUSD', decimals: 12, logo: githubTokenLogoUrl('acala-substrate-tokens-ausd') },
    BNC: { name: 'BNC', symbol: 'BNC', decimals: 12, logo: githubChainLogoUrl('bifrost') },
    BSX: { name: 'BSX', symbol: 'BSX', decimals: 12, logo: githubChainLogoUrl('basilisk') },
    CRAB: { name: 'CRAB', symbol: 'CRAB', decimals: 18 },
    CSM: { name: 'CSM', symbol: 'CSM', decimals: 12 },
    DOT: { name: 'DOT', symbol: 'DOT', decimals: 10, logo: githubChainLogoUrl('polkadot') },
    GLMR: { name: 'GLMR', symbol: 'GLMR', decimals: 18, logo: githubChainLogoUrl('moonbeam') },
    HKO: { name: 'HKO', symbol: 'HKO', decimals: 12 },
    IBTC: { name: 'IBTC', symbol: 'IBTC', decimals: 8 },
    INTR: { name: 'INTR', symbol: 'INTR', decimals: 10 },
    KAR: { name: 'KAR', symbol: 'KAR', decimals: 12, logo: githubChainLogoUrl('karura') },
    KBTC: { name: 'KBTC', symbol: 'KBTC', decimals: 8 },
    KICO: { name: 'KICO', symbol: 'KICO', decimals: 14 },
    KINT: { name: 'KINT', symbol: 'KINT', decimals: 12 },
    KMA: { name: 'KMA', symbol: 'KMA', decimals: 12 },
    KSM: { name: 'KSM', symbol: 'KSM', decimals: 12, logo: githubChainLogoUrl('kusama') },
    KUSD: { name: 'AUSD', symbol: 'AUSD', decimals: 12 },
    LDOT: { name: 'LDOT', symbol: 'LDOT', decimals: 10 },
    LKSM: { name: 'LKSM', symbol: 'LKSM', decimals: 12 },
    LT: { name: 'LT', symbol: 'LT', decimals: 12 },
    MOVR: { name: 'MOVR', symbol: 'MOVR', decimals: 18, logo: githubChainLogoUrl('moonriver') },
    PARA: { name: 'PARA', symbol: 'PARA', decimals: 12 },
    PCHU: { name: 'PCHU', symbol: 'PCHU', decimals: 18 },
    PHA: { name: 'PHA', symbol: 'PHA', decimals: 12 },
    QTZ: { name: 'QTZ', symbol: 'QTZ', decimals: 18 },
    RMRK: { name: 'RMRK', symbol: 'RMRK', decimals: 10 },
    SDN: { name: 'SDN', symbol: 'SDN', decimals: 18 },
    TEER: { name: 'TEER', symbol: 'TEER', decimals: 12 },
    TUR: { name: 'TUR', symbol: 'TUR', decimals: 10 },
    USDT: { name: 'USDT', symbol: 'USDT', decimals: 8 },
    VSKSM: { name: 'VSKSM', symbol: 'VSKSM', decimals: 12 },
  },

  chainTokens: allChains.flatMap(({ chainTokens }) => chainTokens),
  routes: allChains.flatMap(({ routes }) => routes),
}
