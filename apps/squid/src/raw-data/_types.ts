import { Chain, ChainToken, Route, Token } from '../model'

type NoId<T> = Omit<T, 'id'>
type ChainDerivedFields = 'rpcs' | 'tokens' | 'routesFrom' | 'routesTo'
type TokenDerivedFields = 'chains' | 'routes'
type ChainTokenRelationFields = 'chain' | 'token'
type RouteRelationFields = 'from' | 'to' | 'token' | 'feeToken'

export type RawData = {
  chains: Record<string, Omit<NoId<Chain>, ChainDerivedFields>>
  rpcs: Record<string, string[]>
  tokens: Record<string, Omit<NoId<Token>, TokenDerivedFields>>
  chainTokens: Array<Omit<NoId<ChainToken>, ChainTokenRelationFields> & { chain: string; token: string }>
  routes: Array<Omit<NoId<Route>, RouteRelationFields> & { from: string; to: string; token: string; feeToken: string }>
}
