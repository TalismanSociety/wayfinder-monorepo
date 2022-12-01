import chains from '../chains'
import tokens from '../tokens'
import { ChannelType } from '../types'

export default {
  id: 'chain1_chain2',
  source: chains.chain1,
  destination: chains.chain2,
  tokens: [tokens.token1, tokens.token2],
} as ChannelType
