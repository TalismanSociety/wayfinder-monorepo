import chains from '../chains'
import tokens from '../tokens'
import { ChannelType } from '../types'

export default {
  id: 'chain2_chain1',
  source: chains.chain2,
  destination: chains.chain1,
  tokens: [tokens.token2],
} as ChannelType
