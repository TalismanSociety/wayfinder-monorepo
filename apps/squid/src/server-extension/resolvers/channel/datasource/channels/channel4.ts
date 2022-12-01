import chains from '../chains'
import tokens from '../tokens'
import { ChannelType } from '../types'

export default {
  id: 'chain1_chain0',
  source: chains.chain1,
  destination: chains.chain0,
  tokens: [tokens.token1],
} as ChannelType
