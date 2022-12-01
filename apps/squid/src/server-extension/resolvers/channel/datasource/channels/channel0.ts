import chains from '../chains'
import tokens from '../tokens'
import { ChannelType } from '../types'

export default {
  id: 'chain0_chain1',
  source: chains.chain0,
  destination: chains.chain1,
  tokens: [tokens.token0, tokens.token1],
} as ChannelType
