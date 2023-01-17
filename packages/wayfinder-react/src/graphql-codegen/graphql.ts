/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  JSON: any
}

export type AssetInput = {
  chainId: Scalars['String']
  tokenId: Scalars['String']
}

export type BuildResult = {
  __typename?: 'BuildResult'
  method: Scalars['String']
  module: Scalars['String']
  params: Scalars['JSON']
}

export type Chain = {
  __typename?: 'Chain'
  id: Scalars['String']
  logo: Scalars['String']
  name: Scalars['String']
  paraId?: Maybe<Scalars['Int']>
  prefix: Scalars['Int']
  routesFrom: Array<Route>
  routesTo: Array<Route>
  rpcs: Array<Scalars['String']>
  tokens: Array<ChainToken>
}

export type ChainRoutesFromArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Array<RouteOrderByInput>>
  where?: InputMaybe<RouteWhereInput>
}

export type ChainRoutesToArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Array<RouteOrderByInput>>
  where?: InputMaybe<RouteWhereInput>
}

export type ChainTokensArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Array<ChainTokenOrderByInput>>
  where?: InputMaybe<ChainTokenWhereInput>
}

export type ChainEdge = {
  __typename?: 'ChainEdge'
  cursor: Scalars['String']
  node: Chain
}

export enum ChainOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  LogoAsc = 'logo_ASC',
  LogoDesc = 'logo_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  ParaIdAsc = 'paraId_ASC',
  ParaIdDesc = 'paraId_DESC',
  PrefixAsc = 'prefix_ASC',
  PrefixDesc = 'prefix_DESC',
}

export type ChainToken = {
  __typename?: 'ChainToken'
  chain: Chain
  chaindataId: Scalars['String']
  existentialDeposit: Scalars['String']
  id: Scalars['String']
  isNative: Scalars['Boolean']
  token: Token
  tokenIdent: Scalars['String']
}

export type ChainTokenEdge = {
  __typename?: 'ChainTokenEdge'
  cursor: Scalars['String']
  node: ChainToken
}

export enum ChainTokenOrderByInput {
  ChainIdAsc = 'chain_id_ASC',
  ChainIdDesc = 'chain_id_DESC',
  ChainLogoAsc = 'chain_logo_ASC',
  ChainLogoDesc = 'chain_logo_DESC',
  ChainNameAsc = 'chain_name_ASC',
  ChainNameDesc = 'chain_name_DESC',
  ChainParaIdAsc = 'chain_paraId_ASC',
  ChainParaIdDesc = 'chain_paraId_DESC',
  ChainPrefixAsc = 'chain_prefix_ASC',
  ChainPrefixDesc = 'chain_prefix_DESC',
  ChaindataIdAsc = 'chaindataId_ASC',
  ChaindataIdDesc = 'chaindataId_DESC',
  ExistentialDepositAsc = 'existentialDeposit_ASC',
  ExistentialDepositDesc = 'existentialDeposit_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  IsNativeAsc = 'isNative_ASC',
  IsNativeDesc = 'isNative_DESC',
  TokenIdentAsc = 'tokenIdent_ASC',
  TokenIdentDesc = 'tokenIdent_DESC',
  TokenDecimalsAsc = 'token_decimals_ASC',
  TokenDecimalsDesc = 'token_decimals_DESC',
  TokenIdAsc = 'token_id_ASC',
  TokenIdDesc = 'token_id_DESC',
  TokenNameAsc = 'token_name_ASC',
  TokenNameDesc = 'token_name_DESC',
  TokenSymbolAsc = 'token_symbol_ASC',
  TokenSymbolDesc = 'token_symbol_DESC',
}

export type ChainTokenWhereInput = {
  AND?: InputMaybe<Array<ChainTokenWhereInput>>
  OR?: InputMaybe<Array<ChainTokenWhereInput>>
  chain?: InputMaybe<ChainWhereInput>
  chain_isNull?: InputMaybe<Scalars['Boolean']>
  chaindataId_contains?: InputMaybe<Scalars['String']>
  chaindataId_containsInsensitive?: InputMaybe<Scalars['String']>
  chaindataId_endsWith?: InputMaybe<Scalars['String']>
  chaindataId_eq?: InputMaybe<Scalars['String']>
  chaindataId_gt?: InputMaybe<Scalars['String']>
  chaindataId_gte?: InputMaybe<Scalars['String']>
  chaindataId_in?: InputMaybe<Array<Scalars['String']>>
  chaindataId_isNull?: InputMaybe<Scalars['Boolean']>
  chaindataId_lt?: InputMaybe<Scalars['String']>
  chaindataId_lte?: InputMaybe<Scalars['String']>
  chaindataId_not_contains?: InputMaybe<Scalars['String']>
  chaindataId_not_containsInsensitive?: InputMaybe<Scalars['String']>
  chaindataId_not_endsWith?: InputMaybe<Scalars['String']>
  chaindataId_not_eq?: InputMaybe<Scalars['String']>
  chaindataId_not_in?: InputMaybe<Array<Scalars['String']>>
  chaindataId_not_startsWith?: InputMaybe<Scalars['String']>
  chaindataId_startsWith?: InputMaybe<Scalars['String']>
  existentialDeposit_contains?: InputMaybe<Scalars['String']>
  existentialDeposit_containsInsensitive?: InputMaybe<Scalars['String']>
  existentialDeposit_endsWith?: InputMaybe<Scalars['String']>
  existentialDeposit_eq?: InputMaybe<Scalars['String']>
  existentialDeposit_gt?: InputMaybe<Scalars['String']>
  existentialDeposit_gte?: InputMaybe<Scalars['String']>
  existentialDeposit_in?: InputMaybe<Array<Scalars['String']>>
  existentialDeposit_isNull?: InputMaybe<Scalars['Boolean']>
  existentialDeposit_lt?: InputMaybe<Scalars['String']>
  existentialDeposit_lte?: InputMaybe<Scalars['String']>
  existentialDeposit_not_contains?: InputMaybe<Scalars['String']>
  existentialDeposit_not_containsInsensitive?: InputMaybe<Scalars['String']>
  existentialDeposit_not_endsWith?: InputMaybe<Scalars['String']>
  existentialDeposit_not_eq?: InputMaybe<Scalars['String']>
  existentialDeposit_not_in?: InputMaybe<Array<Scalars['String']>>
  existentialDeposit_not_startsWith?: InputMaybe<Scalars['String']>
  existentialDeposit_startsWith?: InputMaybe<Scalars['String']>
  id_contains?: InputMaybe<Scalars['String']>
  id_containsInsensitive?: InputMaybe<Scalars['String']>
  id_endsWith?: InputMaybe<Scalars['String']>
  id_eq?: InputMaybe<Scalars['String']>
  id_gt?: InputMaybe<Scalars['String']>
  id_gte?: InputMaybe<Scalars['String']>
  id_in?: InputMaybe<Array<Scalars['String']>>
  id_isNull?: InputMaybe<Scalars['Boolean']>
  id_lt?: InputMaybe<Scalars['String']>
  id_lte?: InputMaybe<Scalars['String']>
  id_not_contains?: InputMaybe<Scalars['String']>
  id_not_containsInsensitive?: InputMaybe<Scalars['String']>
  id_not_endsWith?: InputMaybe<Scalars['String']>
  id_not_eq?: InputMaybe<Scalars['String']>
  id_not_in?: InputMaybe<Array<Scalars['String']>>
  id_not_startsWith?: InputMaybe<Scalars['String']>
  id_startsWith?: InputMaybe<Scalars['String']>
  isNative_eq?: InputMaybe<Scalars['Boolean']>
  isNative_isNull?: InputMaybe<Scalars['Boolean']>
  isNative_not_eq?: InputMaybe<Scalars['Boolean']>
  token?: InputMaybe<TokenWhereInput>
  tokenIdent_contains?: InputMaybe<Scalars['String']>
  tokenIdent_containsInsensitive?: InputMaybe<Scalars['String']>
  tokenIdent_endsWith?: InputMaybe<Scalars['String']>
  tokenIdent_eq?: InputMaybe<Scalars['String']>
  tokenIdent_gt?: InputMaybe<Scalars['String']>
  tokenIdent_gte?: InputMaybe<Scalars['String']>
  tokenIdent_in?: InputMaybe<Array<Scalars['String']>>
  tokenIdent_isNull?: InputMaybe<Scalars['Boolean']>
  tokenIdent_lt?: InputMaybe<Scalars['String']>
  tokenIdent_lte?: InputMaybe<Scalars['String']>
  tokenIdent_not_contains?: InputMaybe<Scalars['String']>
  tokenIdent_not_containsInsensitive?: InputMaybe<Scalars['String']>
  tokenIdent_not_endsWith?: InputMaybe<Scalars['String']>
  tokenIdent_not_eq?: InputMaybe<Scalars['String']>
  tokenIdent_not_in?: InputMaybe<Array<Scalars['String']>>
  tokenIdent_not_startsWith?: InputMaybe<Scalars['String']>
  tokenIdent_startsWith?: InputMaybe<Scalars['String']>
  token_isNull?: InputMaybe<Scalars['Boolean']>
}

export type ChainTokensConnection = {
  __typename?: 'ChainTokensConnection'
  edges: Array<ChainTokenEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type ChainWhereInput = {
  AND?: InputMaybe<Array<ChainWhereInput>>
  OR?: InputMaybe<Array<ChainWhereInput>>
  id_contains?: InputMaybe<Scalars['String']>
  id_containsInsensitive?: InputMaybe<Scalars['String']>
  id_endsWith?: InputMaybe<Scalars['String']>
  id_eq?: InputMaybe<Scalars['String']>
  id_gt?: InputMaybe<Scalars['String']>
  id_gte?: InputMaybe<Scalars['String']>
  id_in?: InputMaybe<Array<Scalars['String']>>
  id_isNull?: InputMaybe<Scalars['Boolean']>
  id_lt?: InputMaybe<Scalars['String']>
  id_lte?: InputMaybe<Scalars['String']>
  id_not_contains?: InputMaybe<Scalars['String']>
  id_not_containsInsensitive?: InputMaybe<Scalars['String']>
  id_not_endsWith?: InputMaybe<Scalars['String']>
  id_not_eq?: InputMaybe<Scalars['String']>
  id_not_in?: InputMaybe<Array<Scalars['String']>>
  id_not_startsWith?: InputMaybe<Scalars['String']>
  id_startsWith?: InputMaybe<Scalars['String']>
  logo_contains?: InputMaybe<Scalars['String']>
  logo_containsInsensitive?: InputMaybe<Scalars['String']>
  logo_endsWith?: InputMaybe<Scalars['String']>
  logo_eq?: InputMaybe<Scalars['String']>
  logo_gt?: InputMaybe<Scalars['String']>
  logo_gte?: InputMaybe<Scalars['String']>
  logo_in?: InputMaybe<Array<Scalars['String']>>
  logo_isNull?: InputMaybe<Scalars['Boolean']>
  logo_lt?: InputMaybe<Scalars['String']>
  logo_lte?: InputMaybe<Scalars['String']>
  logo_not_contains?: InputMaybe<Scalars['String']>
  logo_not_containsInsensitive?: InputMaybe<Scalars['String']>
  logo_not_endsWith?: InputMaybe<Scalars['String']>
  logo_not_eq?: InputMaybe<Scalars['String']>
  logo_not_in?: InputMaybe<Array<Scalars['String']>>
  logo_not_startsWith?: InputMaybe<Scalars['String']>
  logo_startsWith?: InputMaybe<Scalars['String']>
  name_contains?: InputMaybe<Scalars['String']>
  name_containsInsensitive?: InputMaybe<Scalars['String']>
  name_endsWith?: InputMaybe<Scalars['String']>
  name_eq?: InputMaybe<Scalars['String']>
  name_gt?: InputMaybe<Scalars['String']>
  name_gte?: InputMaybe<Scalars['String']>
  name_in?: InputMaybe<Array<Scalars['String']>>
  name_isNull?: InputMaybe<Scalars['Boolean']>
  name_lt?: InputMaybe<Scalars['String']>
  name_lte?: InputMaybe<Scalars['String']>
  name_not_contains?: InputMaybe<Scalars['String']>
  name_not_containsInsensitive?: InputMaybe<Scalars['String']>
  name_not_endsWith?: InputMaybe<Scalars['String']>
  name_not_eq?: InputMaybe<Scalars['String']>
  name_not_in?: InputMaybe<Array<Scalars['String']>>
  name_not_startsWith?: InputMaybe<Scalars['String']>
  name_startsWith?: InputMaybe<Scalars['String']>
  paraId_eq?: InputMaybe<Scalars['Int']>
  paraId_gt?: InputMaybe<Scalars['Int']>
  paraId_gte?: InputMaybe<Scalars['Int']>
  paraId_in?: InputMaybe<Array<Scalars['Int']>>
  paraId_isNull?: InputMaybe<Scalars['Boolean']>
  paraId_lt?: InputMaybe<Scalars['Int']>
  paraId_lte?: InputMaybe<Scalars['Int']>
  paraId_not_eq?: InputMaybe<Scalars['Int']>
  paraId_not_in?: InputMaybe<Array<Scalars['Int']>>
  prefix_eq?: InputMaybe<Scalars['Int']>
  prefix_gt?: InputMaybe<Scalars['Int']>
  prefix_gte?: InputMaybe<Scalars['Int']>
  prefix_in?: InputMaybe<Array<Scalars['Int']>>
  prefix_isNull?: InputMaybe<Scalars['Boolean']>
  prefix_lt?: InputMaybe<Scalars['Int']>
  prefix_lte?: InputMaybe<Scalars['Int']>
  prefix_not_eq?: InputMaybe<Scalars['Int']>
  prefix_not_in?: InputMaybe<Array<Scalars['Int']>>
  routesFrom_every?: InputMaybe<RouteWhereInput>
  routesFrom_none?: InputMaybe<RouteWhereInput>
  routesFrom_some?: InputMaybe<RouteWhereInput>
  routesTo_every?: InputMaybe<RouteWhereInput>
  routesTo_none?: InputMaybe<RouteWhereInput>
  routesTo_some?: InputMaybe<RouteWhereInput>
  rpcs_containsAll?: InputMaybe<Array<Scalars['String']>>
  rpcs_containsAny?: InputMaybe<Array<Scalars['String']>>
  rpcs_containsNone?: InputMaybe<Array<Scalars['String']>>
  rpcs_isNull?: InputMaybe<Scalars['Boolean']>
  tokens_every?: InputMaybe<ChainTokenWhereInput>
  tokens_none?: InputMaybe<ChainTokenWhereInput>
  tokens_some?: InputMaybe<ChainTokenWhereInput>
}

export type ChainsConnection = {
  __typename?: 'ChainsConnection'
  edges: Array<ChainEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type FilterResult = {
  __typename?: 'FilterResult'
  destinations: Array<Chain>
  routes: Array<Route>
  sources: Array<Chain>
  tokens: Array<Token>
}

export type PageInfo = {
  __typename?: 'PageInfo'
  endCursor: Scalars['String']
  hasNextPage: Scalars['Boolean']
  hasPreviousPage: Scalars['Boolean']
  startCursor: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  build: BuildResult
  chainById?: Maybe<Chain>
  /** @deprecated Use chainById */
  chainByUniqueInput?: Maybe<Chain>
  chainTokenById?: Maybe<ChainToken>
  /** @deprecated Use chainTokenById */
  chainTokenByUniqueInput?: Maybe<ChainToken>
  chainTokens: Array<ChainToken>
  chainTokensConnection: ChainTokensConnection
  chains: Array<Chain>
  chainsConnection: ChainsConnection
  filter: FilterResult
  routeById?: Maybe<Route>
  /** @deprecated Use routeById */
  routeByUniqueInput?: Maybe<Route>
  routes: Array<Route>
  routesConnection: RoutesConnection
  squidStatus?: Maybe<SquidStatus>
  tokenById?: Maybe<Token>
  /** @deprecated Use tokenById */
  tokenByUniqueInput?: Maybe<Token>
  tokens: Array<Token>
  tokensConnection: TokensConnection
}

export type QueryBuildArgs = {
  accountId: Scalars['String']
  amount: Scalars['String']
  route: Scalars['String']
}

export type QueryChainByIdArgs = {
  id: Scalars['String']
}

export type QueryChainByUniqueInputArgs = {
  where: WhereIdInput
}

export type QueryChainTokenByIdArgs = {
  id: Scalars['String']
}

export type QueryChainTokenByUniqueInputArgs = {
  where: WhereIdInput
}

export type QueryChainTokensArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Array<ChainTokenOrderByInput>>
  where?: InputMaybe<ChainTokenWhereInput>
}

export type QueryChainTokensConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  orderBy: Array<ChainTokenOrderByInput>
  where?: InputMaybe<ChainTokenWhereInput>
}

export type QueryChainsArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Array<ChainOrderByInput>>
  where?: InputMaybe<ChainWhereInput>
}

export type QueryChainsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  orderBy: Array<ChainOrderByInput>
  where?: InputMaybe<ChainWhereInput>
}

export type QueryFilterArgs = {
  assets?: InputMaybe<Array<AssetInput>>
  from?: InputMaybe<Scalars['String']>
  to?: InputMaybe<Scalars['String']>
  token?: InputMaybe<Scalars['String']>
}

export type QueryRouteByIdArgs = {
  id: Scalars['String']
}

export type QueryRouteByUniqueInputArgs = {
  where: WhereIdInput
}

export type QueryRoutesArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Array<RouteOrderByInput>>
  where?: InputMaybe<RouteWhereInput>
}

export type QueryRoutesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  orderBy: Array<RouteOrderByInput>
  where?: InputMaybe<RouteWhereInput>
}

export type QueryTokenByIdArgs = {
  id: Scalars['String']
}

export type QueryTokenByUniqueInputArgs = {
  where: WhereIdInput
}

export type QueryTokensArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Array<TokenOrderByInput>>
  where?: InputMaybe<TokenWhereInput>
}

export type QueryTokensConnectionArgs = {
  after?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  orderBy: Array<TokenOrderByInput>
  where?: InputMaybe<TokenWhereInput>
}

export type Route = {
  __typename?: 'Route'
  fee: Scalars['String']
  feeToken: Token
  from: Chain
  id: Scalars['String']
  to: Chain
  token: Token
  weightLimit: Scalars['String']
}

export type RouteEdge = {
  __typename?: 'RouteEdge'
  cursor: Scalars['String']
  node: Route
}

export enum RouteOrderByInput {
  FeeTokenDecimalsAsc = 'feeToken_decimals_ASC',
  FeeTokenDecimalsDesc = 'feeToken_decimals_DESC',
  FeeTokenIdAsc = 'feeToken_id_ASC',
  FeeTokenIdDesc = 'feeToken_id_DESC',
  FeeTokenNameAsc = 'feeToken_name_ASC',
  FeeTokenNameDesc = 'feeToken_name_DESC',
  FeeTokenSymbolAsc = 'feeToken_symbol_ASC',
  FeeTokenSymbolDesc = 'feeToken_symbol_DESC',
  FeeAsc = 'fee_ASC',
  FeeDesc = 'fee_DESC',
  FromIdAsc = 'from_id_ASC',
  FromIdDesc = 'from_id_DESC',
  FromLogoAsc = 'from_logo_ASC',
  FromLogoDesc = 'from_logo_DESC',
  FromNameAsc = 'from_name_ASC',
  FromNameDesc = 'from_name_DESC',
  FromParaIdAsc = 'from_paraId_ASC',
  FromParaIdDesc = 'from_paraId_DESC',
  FromPrefixAsc = 'from_prefix_ASC',
  FromPrefixDesc = 'from_prefix_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  ToIdAsc = 'to_id_ASC',
  ToIdDesc = 'to_id_DESC',
  ToLogoAsc = 'to_logo_ASC',
  ToLogoDesc = 'to_logo_DESC',
  ToNameAsc = 'to_name_ASC',
  ToNameDesc = 'to_name_DESC',
  ToParaIdAsc = 'to_paraId_ASC',
  ToParaIdDesc = 'to_paraId_DESC',
  ToPrefixAsc = 'to_prefix_ASC',
  ToPrefixDesc = 'to_prefix_DESC',
  TokenDecimalsAsc = 'token_decimals_ASC',
  TokenDecimalsDesc = 'token_decimals_DESC',
  TokenIdAsc = 'token_id_ASC',
  TokenIdDesc = 'token_id_DESC',
  TokenNameAsc = 'token_name_ASC',
  TokenNameDesc = 'token_name_DESC',
  TokenSymbolAsc = 'token_symbol_ASC',
  TokenSymbolDesc = 'token_symbol_DESC',
  WeightLimitAsc = 'weightLimit_ASC',
  WeightLimitDesc = 'weightLimit_DESC',
}

export type RouteWhereInput = {
  AND?: InputMaybe<Array<RouteWhereInput>>
  OR?: InputMaybe<Array<RouteWhereInput>>
  feeToken?: InputMaybe<TokenWhereInput>
  feeToken_isNull?: InputMaybe<Scalars['Boolean']>
  fee_contains?: InputMaybe<Scalars['String']>
  fee_containsInsensitive?: InputMaybe<Scalars['String']>
  fee_endsWith?: InputMaybe<Scalars['String']>
  fee_eq?: InputMaybe<Scalars['String']>
  fee_gt?: InputMaybe<Scalars['String']>
  fee_gte?: InputMaybe<Scalars['String']>
  fee_in?: InputMaybe<Array<Scalars['String']>>
  fee_isNull?: InputMaybe<Scalars['Boolean']>
  fee_lt?: InputMaybe<Scalars['String']>
  fee_lte?: InputMaybe<Scalars['String']>
  fee_not_contains?: InputMaybe<Scalars['String']>
  fee_not_containsInsensitive?: InputMaybe<Scalars['String']>
  fee_not_endsWith?: InputMaybe<Scalars['String']>
  fee_not_eq?: InputMaybe<Scalars['String']>
  fee_not_in?: InputMaybe<Array<Scalars['String']>>
  fee_not_startsWith?: InputMaybe<Scalars['String']>
  fee_startsWith?: InputMaybe<Scalars['String']>
  from?: InputMaybe<ChainWhereInput>
  from_isNull?: InputMaybe<Scalars['Boolean']>
  id_contains?: InputMaybe<Scalars['String']>
  id_containsInsensitive?: InputMaybe<Scalars['String']>
  id_endsWith?: InputMaybe<Scalars['String']>
  id_eq?: InputMaybe<Scalars['String']>
  id_gt?: InputMaybe<Scalars['String']>
  id_gte?: InputMaybe<Scalars['String']>
  id_in?: InputMaybe<Array<Scalars['String']>>
  id_isNull?: InputMaybe<Scalars['Boolean']>
  id_lt?: InputMaybe<Scalars['String']>
  id_lte?: InputMaybe<Scalars['String']>
  id_not_contains?: InputMaybe<Scalars['String']>
  id_not_containsInsensitive?: InputMaybe<Scalars['String']>
  id_not_endsWith?: InputMaybe<Scalars['String']>
  id_not_eq?: InputMaybe<Scalars['String']>
  id_not_in?: InputMaybe<Array<Scalars['String']>>
  id_not_startsWith?: InputMaybe<Scalars['String']>
  id_startsWith?: InputMaybe<Scalars['String']>
  to?: InputMaybe<ChainWhereInput>
  to_isNull?: InputMaybe<Scalars['Boolean']>
  token?: InputMaybe<TokenWhereInput>
  token_isNull?: InputMaybe<Scalars['Boolean']>
  weightLimit_contains?: InputMaybe<Scalars['String']>
  weightLimit_containsInsensitive?: InputMaybe<Scalars['String']>
  weightLimit_endsWith?: InputMaybe<Scalars['String']>
  weightLimit_eq?: InputMaybe<Scalars['String']>
  weightLimit_gt?: InputMaybe<Scalars['String']>
  weightLimit_gte?: InputMaybe<Scalars['String']>
  weightLimit_in?: InputMaybe<Array<Scalars['String']>>
  weightLimit_isNull?: InputMaybe<Scalars['Boolean']>
  weightLimit_lt?: InputMaybe<Scalars['String']>
  weightLimit_lte?: InputMaybe<Scalars['String']>
  weightLimit_not_contains?: InputMaybe<Scalars['String']>
  weightLimit_not_containsInsensitive?: InputMaybe<Scalars['String']>
  weightLimit_not_endsWith?: InputMaybe<Scalars['String']>
  weightLimit_not_eq?: InputMaybe<Scalars['String']>
  weightLimit_not_in?: InputMaybe<Array<Scalars['String']>>
  weightLimit_not_startsWith?: InputMaybe<Scalars['String']>
  weightLimit_startsWith?: InputMaybe<Scalars['String']>
}

export type RoutesConnection = {
  __typename?: 'RoutesConnection'
  edges: Array<RouteEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type SquidStatus = {
  __typename?: 'SquidStatus'
  /** The height of the processed part of the chain */
  height?: Maybe<Scalars['Int']>
}

export type Subscription = {
  __typename?: 'Subscription'
  chainById?: Maybe<Chain>
  chainTokenById?: Maybe<ChainToken>
  chainTokens: Array<ChainToken>
  chains: Array<Chain>
  routeById?: Maybe<Route>
  routes: Array<Route>
  tokenById?: Maybe<Token>
  tokens: Array<Token>
}

export type SubscriptionChainByIdArgs = {
  id: Scalars['String']
}

export type SubscriptionChainTokenByIdArgs = {
  id: Scalars['String']
}

export type SubscriptionChainTokensArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Array<ChainTokenOrderByInput>>
  where?: InputMaybe<ChainTokenWhereInput>
}

export type SubscriptionChainsArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Array<ChainOrderByInput>>
  where?: InputMaybe<ChainWhereInput>
}

export type SubscriptionRouteByIdArgs = {
  id: Scalars['String']
}

export type SubscriptionRoutesArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Array<RouteOrderByInput>>
  where?: InputMaybe<RouteWhereInput>
}

export type SubscriptionTokenByIdArgs = {
  id: Scalars['String']
}

export type SubscriptionTokensArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Array<TokenOrderByInput>>
  where?: InputMaybe<TokenWhereInput>
}

export type Token = {
  __typename?: 'Token'
  chains: Array<ChainToken>
  decimals: Scalars['Int']
  id: Scalars['String']
  name: Scalars['String']
  routes: Array<Route>
  symbol: Scalars['String']
}

export type TokenChainsArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Array<ChainTokenOrderByInput>>
  where?: InputMaybe<ChainTokenWhereInput>
}

export type TokenRoutesArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Array<RouteOrderByInput>>
  where?: InputMaybe<RouteWhereInput>
}

export type TokenEdge = {
  __typename?: 'TokenEdge'
  cursor: Scalars['String']
  node: Token
}

export enum TokenOrderByInput {
  DecimalsAsc = 'decimals_ASC',
  DecimalsDesc = 'decimals_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SymbolAsc = 'symbol_ASC',
  SymbolDesc = 'symbol_DESC',
}

export type TokenWhereInput = {
  AND?: InputMaybe<Array<TokenWhereInput>>
  OR?: InputMaybe<Array<TokenWhereInput>>
  chains_every?: InputMaybe<ChainTokenWhereInput>
  chains_none?: InputMaybe<ChainTokenWhereInput>
  chains_some?: InputMaybe<ChainTokenWhereInput>
  decimals_eq?: InputMaybe<Scalars['Int']>
  decimals_gt?: InputMaybe<Scalars['Int']>
  decimals_gte?: InputMaybe<Scalars['Int']>
  decimals_in?: InputMaybe<Array<Scalars['Int']>>
  decimals_isNull?: InputMaybe<Scalars['Boolean']>
  decimals_lt?: InputMaybe<Scalars['Int']>
  decimals_lte?: InputMaybe<Scalars['Int']>
  decimals_not_eq?: InputMaybe<Scalars['Int']>
  decimals_not_in?: InputMaybe<Array<Scalars['Int']>>
  id_contains?: InputMaybe<Scalars['String']>
  id_containsInsensitive?: InputMaybe<Scalars['String']>
  id_endsWith?: InputMaybe<Scalars['String']>
  id_eq?: InputMaybe<Scalars['String']>
  id_gt?: InputMaybe<Scalars['String']>
  id_gte?: InputMaybe<Scalars['String']>
  id_in?: InputMaybe<Array<Scalars['String']>>
  id_isNull?: InputMaybe<Scalars['Boolean']>
  id_lt?: InputMaybe<Scalars['String']>
  id_lte?: InputMaybe<Scalars['String']>
  id_not_contains?: InputMaybe<Scalars['String']>
  id_not_containsInsensitive?: InputMaybe<Scalars['String']>
  id_not_endsWith?: InputMaybe<Scalars['String']>
  id_not_eq?: InputMaybe<Scalars['String']>
  id_not_in?: InputMaybe<Array<Scalars['String']>>
  id_not_startsWith?: InputMaybe<Scalars['String']>
  id_startsWith?: InputMaybe<Scalars['String']>
  name_contains?: InputMaybe<Scalars['String']>
  name_containsInsensitive?: InputMaybe<Scalars['String']>
  name_endsWith?: InputMaybe<Scalars['String']>
  name_eq?: InputMaybe<Scalars['String']>
  name_gt?: InputMaybe<Scalars['String']>
  name_gte?: InputMaybe<Scalars['String']>
  name_in?: InputMaybe<Array<Scalars['String']>>
  name_isNull?: InputMaybe<Scalars['Boolean']>
  name_lt?: InputMaybe<Scalars['String']>
  name_lte?: InputMaybe<Scalars['String']>
  name_not_contains?: InputMaybe<Scalars['String']>
  name_not_containsInsensitive?: InputMaybe<Scalars['String']>
  name_not_endsWith?: InputMaybe<Scalars['String']>
  name_not_eq?: InputMaybe<Scalars['String']>
  name_not_in?: InputMaybe<Array<Scalars['String']>>
  name_not_startsWith?: InputMaybe<Scalars['String']>
  name_startsWith?: InputMaybe<Scalars['String']>
  routes_every?: InputMaybe<RouteWhereInput>
  routes_none?: InputMaybe<RouteWhereInput>
  routes_some?: InputMaybe<RouteWhereInput>
  symbol_contains?: InputMaybe<Scalars['String']>
  symbol_containsInsensitive?: InputMaybe<Scalars['String']>
  symbol_endsWith?: InputMaybe<Scalars['String']>
  symbol_eq?: InputMaybe<Scalars['String']>
  symbol_gt?: InputMaybe<Scalars['String']>
  symbol_gte?: InputMaybe<Scalars['String']>
  symbol_in?: InputMaybe<Array<Scalars['String']>>
  symbol_isNull?: InputMaybe<Scalars['Boolean']>
  symbol_lt?: InputMaybe<Scalars['String']>
  symbol_lte?: InputMaybe<Scalars['String']>
  symbol_not_contains?: InputMaybe<Scalars['String']>
  symbol_not_containsInsensitive?: InputMaybe<Scalars['String']>
  symbol_not_endsWith?: InputMaybe<Scalars['String']>
  symbol_not_eq?: InputMaybe<Scalars['String']>
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>
  symbol_not_startsWith?: InputMaybe<Scalars['String']>
  symbol_startsWith?: InputMaybe<Scalars['String']>
}

export type TokensConnection = {
  __typename?: 'TokensConnection'
  edges: Array<TokenEdge>
  pageInfo: PageInfo
  totalCount: Scalars['Int']
}

export type WhereIdInput = {
  id: Scalars['String']
}

export type RoutesQueryVariables = Exact<{ [key: string]: never }>

export type RoutesQuery = {
  __typename?: 'Query'
  filter: {
    __typename?: 'FilterResult'
    routes: Array<{
      __typename?: 'Route'
      id: string
      fee: string
      weightLimit: string
      from: { __typename?: 'Chain'; id: string }
      to: { __typename?: 'Chain'; id: string }
      token: { __typename?: 'Token'; id: string }
      feeToken: { __typename?: 'Token'; id: string }
    }>
  }
}

export type SourcesQueryVariables = Exact<{ [key: string]: never }>

export type SourcesQuery = {
  __typename?: 'Query'
  filter: {
    __typename?: 'FilterResult'
    sources: Array<{
      __typename?: 'Chain'
      id: string
      paraId?: number | null
      name: string
      logo: string
      prefix: number
      rpcs: Array<string>
      tokens: Array<{
        __typename?: 'ChainToken'
        isNative: boolean
        existentialDeposit: string
        tokenIdent: string
        token: { __typename?: 'Token'; id: string }
      }>
      routesFrom: Array<{ __typename?: 'Route'; id: string }>
      routesTo: Array<{ __typename?: 'Route'; id: string }>
    }>
  }
}

export type DestinationsQueryVariables = Exact<{ [key: string]: never }>

export type DestinationsQuery = {
  __typename?: 'Query'
  filter: {
    __typename?: 'FilterResult'
    destinations: Array<{
      __typename?: 'Chain'
      id: string
      paraId?: number | null
      name: string
      logo: string
      prefix: number
      rpcs: Array<string>
      tokens: Array<{
        __typename?: 'ChainToken'
        isNative: boolean
        existentialDeposit: string
        tokenIdent: string
        token: { __typename?: 'Token'; id: string }
      }>
      routesFrom: Array<{ __typename?: 'Route'; id: string }>
      routesTo: Array<{ __typename?: 'Route'; id: string }>
    }>
  }
}

export type TokensQueryVariables = Exact<{ [key: string]: never }>

export type TokensQuery = {
  __typename?: 'Query'
  filter: {
    __typename?: 'FilterResult'
    tokens: Array<{
      __typename?: 'Token'
      id: string
      name: string
      symbol: string
      decimals: number
      chains: Array<{
        __typename?: 'ChainToken'
        isNative: boolean
        existentialDeposit: string
        tokenIdent: string
        chaindataId: string
        chain: { __typename?: 'Chain'; id: string }
      }>
      routes: Array<{ __typename?: 'Route'; id: string }>
    }>
  }
}

export type BuildQueryQueryVariables = Exact<{
  route: Scalars['String']
  accountId: Scalars['String']
  amount: Scalars['String']
}>

export type BuildQueryQuery = {
  __typename?: 'Query'
  build: { __typename?: 'BuildResult'; module: string; method: string; params: any }
}

export type FilterQueryQueryVariables = Exact<{
  from?: InputMaybe<Scalars['String']>
  to?: InputMaybe<Scalars['String']>
  token?: InputMaybe<Scalars['String']>
  assets?: InputMaybe<Array<AssetInput> | AssetInput>
}>

export type FilterQueryQuery = {
  __typename?: 'Query'
  filter: {
    __typename?: 'FilterResult'
    routes: Array<{ __typename?: 'Route'; id: string }>
    sources: Array<{ __typename?: 'Chain'; id: string }>
    destinations: Array<{ __typename?: 'Chain'; id: string }>
    tokens: Array<{ __typename?: 'Token'; id: string }>
  }
}

export const RoutesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'routes' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'filter' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'routes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'from' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'to' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'token' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'feeToken' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'fee' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'weightLimit' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RoutesQuery, RoutesQueryVariables>
export const SourcesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'sources' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'filter' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sources' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'paraId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'logo' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'prefix' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'rpcs' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'tokens' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'token' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                              },
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'isNative' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'existentialDeposit' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'tokenIdent' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'routesFrom' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'routesTo' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SourcesQuery, SourcesQueryVariables>
export const DestinationsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'destinations' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'filter' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'destinations' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'paraId' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'logo' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'prefix' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'rpcs' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'tokens' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'token' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                              },
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'isNative' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'existentialDeposit' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'tokenIdent' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'routesFrom' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'routesTo' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DestinationsQuery, DestinationsQueryVariables>
export const TokensDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'tokens' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'filter' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tokens' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'symbol' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'decimals' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'chains' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'chain' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                              },
                            },
                            { kind: 'Field', name: { kind: 'Name', value: 'isNative' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'existentialDeposit' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'tokenIdent' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'chaindataId' } },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'routes' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TokensQuery, TokensQueryVariables>
export const BuildQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'buildQuery' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'route' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'accountId' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
          type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'build' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'route' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'route' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'accountId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'accountId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'amount' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'amount' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'module' } },
                { kind: 'Field', name: { kind: 'Name', value: 'method' } },
                { kind: 'Field', name: { kind: 'Name', value: 'params' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BuildQueryQuery, BuildQueryQueryVariables>
export const FilterQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'filterQuery' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'from' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'to' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'token' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'assets' } },
          type: {
            kind: 'ListType',
            type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'AssetInput' } } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'filter' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'from' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'from' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'to' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'to' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'token' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'token' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'assets' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'assets' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'routes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sources' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'destinations' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tokens' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FilterQueryQuery, FilterQueryQueryVariables>
