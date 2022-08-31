import { ChannelObject } from '../types'
import chains from './chains'
import tokens from './tokens'
import pallets from './pallets'

const channels: ChannelObject = {
  'chain1.chain2': {
    id: 'chain1.chain2',
    source: chains.chain1,
    destination: chains.chain2,
    pallet: pallets.pallet1,
    tokens: [tokens.token1, tokens.token2]
  },
  'chain2.chain3': {
    id: 'chain2.chain3',
    source: chains.chain2,
    destination: chains.chain3,
    pallet: pallets.pallet1,
    tokens: [tokens.token2, tokens.token3]
  },
  'chain1.chain3': {
    id: 'chain1.chain3',
    source: chains.chain1,
    destination: chains.chain3,
    pallet: pallets.pallet1,
    tokens: [tokens.token1, tokens.token3]
  },
  'chain3.chain1': {
    id: 'chain3.chain1',
    source: chains.chain3,
    destination: chains.chain1,
    pallet: pallets.pallet1,
    tokens: [tokens.token3]
  },
  'chain2.chain1': {
    id: 'chain2.chain1',
    source: chains.chain2,
    destination: chains.chain1,
    pallet: pallets.pallet2,
    tokens: [tokens.token2, tokens.token3]
  }
}

export default channels