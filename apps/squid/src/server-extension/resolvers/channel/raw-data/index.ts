import { githubChainLogoUrl } from '@talismn/chaindata-provider'

import type { RawData } from './_types'
import * as acala from './acala'
import * as bifrost from './bifrost'
import * as karura from './karura'
import * as kusama from './kusama'
import * as polkadot from './polkadot'
import * as statemine from './statemine'
import * as statemint from './statemint'

const allChains = [
  // polkadot relaychain
  polkadot,
  statemint,
  acala,

  // kusama relaychain
  kusama,
  statemine,
  karura,
  bifrost,
]

export const rawData: RawData = {
  chains: {
    polkadot: { paraId: null, name: 'Polkadot', logo: githubChainLogoUrl('polkadot'), prefix: 0 },
    statemint: { paraId: 1000, name: 'Statemint', logo: githubChainLogoUrl('statemint'), prefix: 0 },
    acala: { paraId: 2000, name: 'Acala', logo: githubChainLogoUrl('acala'), prefix: 10 },

    kusama: { paraId: null, name: 'Kusama', logo: githubChainLogoUrl('kusama'), prefix: 2 },
    statemine: { paraId: 1000, name: 'Statemine', logo: githubChainLogoUrl('statemine'), prefix: 2 },
    karura: { paraId: 2000, name: 'Karura', logo: githubChainLogoUrl('karura'), prefix: 8 },
    bifrost: { paraId: 2001, name: 'Bifrost', logo: githubChainLogoUrl('bifrost'), prefix: 6 },
  },

  tokens: {
    DOT: { name: 'DOT', symbol: 'DOT', decimals: 10 },
    ACA: { name: 'ACA', symbol: 'ACA', decimals: 12 },
    AUSD: { name: 'AUSD', symbol: 'AUSD', decimals: 12 },

    KSM: { name: 'KSM', symbol: 'KSM', decimals: 12 },
    RMRK: { name: 'RMRK', symbol: 'RMRK', decimals: 10 },
    KAR: { name: 'KAR', symbol: 'KAR', decimals: 12 },
    BNC: { name: 'BNC', symbol: 'BNC', decimals: 12 },
  },

  chainTokens: allChains.flatMap(({ chainTokens }) => chainTokens),
  routes: allChains.flatMap(({ routes }) => routes),
}
