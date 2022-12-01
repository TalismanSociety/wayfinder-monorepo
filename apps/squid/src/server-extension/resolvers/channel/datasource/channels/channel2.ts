import chains from '../chains'
import tokens from '../tokens'
import { ChannelType } from '../types'

export default {
  id: 'chain0_chain2',
  source: chains.chain0,
  destination: chains.chain2,
  tokens: [tokens.token0, tokens.token2],
} as ChannelType
