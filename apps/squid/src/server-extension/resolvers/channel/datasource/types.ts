export type ChainType = {
  id: string
  name: string
  pallet: string // the XCM pallet this chain uses when sending
}

export type TokenType = {
  id: string
  name: string
  symbol: string
}

export type ChannelType = {
  id: string
  source: ChainType
  destination: ChainType
  tokens: TokenType[]
}
