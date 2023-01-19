import uniq from 'lodash/uniq'
import { Arg, FieldResolver, Query, Resolver, ResolverInterface, Root } from 'type-graphql'
import { EntityManager, In } from 'typeorm'

import {
  Chain as ChainModel,
  ChainToken as ChainTokenModel,
  Route as RouteModel,
  Token as TokenModel,
} from '../../model'
import { AssetInput, Chain, ChainToken, FilterResult, Route, Token } from '../model'

@Resolver()
export class FilterResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Query(() => FilterResult)
  async filter(
    @Arg('from', { nullable: true }) fromId: string,
    @Arg('to', { nullable: true }) toId: string,
    @Arg('token', { nullable: true }) tokenId: string,
    @Arg('assets', () => [AssetInput], { nullable: true }) assets: Array<{ chainId: string; tokenId: string }>
  ): Promise<FilterResult> {
    const manager = await this.tx()

    // fetch all the things
    const allChains = await manager.find(ChainModel, { loadRelationIds: { disableMixedMap: true } })
    const allTokens = await manager.find(TokenModel, { loadRelationIds: { disableMixedMap: true } })
    const allRoutes = await manager.find(RouteModel, { loadRelationIds: { disableMixedMap: true } })

    // organise the things which we'll later need to retrieve by id
    const allChainsMap = Object.fromEntries(allChains.map((chain) => [chain.id, chain]))
    const allTokensMap = Object.fromEntries(allTokens.map((token) => [token.id, token]))

    // create the route filters
    const allPass = () => true
    const fromFilter = fromId ? (route: Route) => route.from.id === fromId : allPass
    const toFilter = toId ? (route: Route) => route.to.id === toId : allPass
    const tokenFilter = tokenId ? (route: Route) => route.token.id === tokenId : allPass
    const assetsFilter = assets
      ? (route: Route) => assets.some(({ chainId, tokenId }) => chainId === route.from.id && tokenId === route.token.id)
      : allPass

    // filter the routes
    const routes = allRoutes.filter(fromFilter).filter(toFilter).filter(tokenFilter).filter(assetsFilter)

    // retrieve the filtered things based on the remaining routes
    const sources = uniq(routes.map(({ from }) => from.id))
      .map((id) => allChainsMap[id])
      .filter(isDefined)
    const destinations = uniq(routes.map(({ to }) => to.id))
      .map((id) => allChainsMap[id])
      .filter(isDefined)
    const tokens = uniq(routes.map(({ token }) => token.id))
      .map((id) => allTokensMap[id])
      .filter(isDefined)

    // return the results
    return { routes, sources, destinations, tokens }
  }
}

@Resolver(() => Chain)
export class ChainResolver implements ResolverInterface<Chain> {
  constructor(private tx: () => Promise<EntityManager>) {}

  @FieldResolver()
  async tokens(@Root() chain: Chain) {
    const manager = await this.tx()
    return await manager.find(ChainTokenModel, {
      where: { id: In(chain.tokens.map(({ id }) => id)) },
      loadRelationIds: { disableMixedMap: true },
    })
  }

  @FieldResolver()
  async routesFrom(@Root() chain: Chain) {
    const manager = await this.tx()
    return await manager.find(RouteModel, {
      where: { id: In(chain.routesFrom.map(({ id }) => id)) },
      loadRelationIds: { disableMixedMap: true },
    })
  }

  @FieldResolver()
  async routesTo(@Root() chain: Chain) {
    const manager = await this.tx()
    return await manager.find(RouteModel, {
      where: { id: In(chain.routesTo.map(({ id }) => id)) },
      loadRelationIds: { disableMixedMap: true },
    })
  }
}

@Resolver(() => Token)
export class TokenResolver implements ResolverInterface<Token> {
  constructor(private tx: () => Promise<EntityManager>) {}

  @FieldResolver()
  async chains(@Root() token: Token) {
    const manager = await this.tx()
    return await manager.find(ChainTokenModel, {
      where: { id: In(token.chains.map(({ id }) => id)) },
      loadRelationIds: { disableMixedMap: true },
    })
  }

  @FieldResolver()
  async routes(@Root() token: Token) {
    const manager = await this.tx()
    return await manager.find(RouteModel, {
      where: { id: In(token.routes.map(({ id }) => id)) },
      loadRelationIds: { disableMixedMap: true },
    })
  }
}

@Resolver(() => ChainToken)
export class ChainTokenResolver implements ResolverInterface<ChainToken> {
  constructor(private tx: () => Promise<EntityManager>) {}

  @FieldResolver()
  async chain(@Root() chainToken: ChainToken) {
    const manager = await this.tx()
    const chain = await manager.findOne(ChainModel, {
      where: { id: chainToken.chain.id },
      loadRelationIds: { disableMixedMap: true },
    })
    if (!chain) throw new Error(`Can't find chain ${chainToken.chain.id}`)
    return chain
  }

  @FieldResolver()
  async token(@Root() chainToken: ChainToken) {
    const manager = await this.tx()
    const token = await manager.findOne(TokenModel, {
      where: { id: chainToken.token.id },
      loadRelationIds: { disableMixedMap: true },
    })
    if (!token) throw new Error(`Can't find token ${chainToken.token.id}`)
    return token
  }
}

@Resolver(() => Route)
export class RouteResolver implements ResolverInterface<Route> {
  constructor(private tx: () => Promise<EntityManager>) {}

  @FieldResolver()
  async from(@Root() route: Route) {
    const manager = await this.tx()
    const chain = await manager.findOne(ChainModel, {
      where: { id: route.from.id },
      loadRelationIds: { disableMixedMap: true },
    })
    if (!chain) throw new Error(`Can't find chain ${route.from.id}`)
    return chain
  }

  @FieldResolver()
  async to(@Root() route: Route) {
    const manager = await this.tx()
    const chain = await manager.findOne(ChainModel, {
      where: { id: route.to.id },
      loadRelationIds: { disableMixedMap: true },
    })
    if (!chain) throw new Error(`Can't find chain ${route.to.id}`)
    return chain
  }

  @FieldResolver()
  async token(@Root() route: Route) {
    const manager = await this.tx()
    const token = await manager.findOne(TokenModel, {
      where: { id: route.token.id },
      loadRelationIds: { disableMixedMap: true },
    })
    if (!token) throw new Error(`Can't find token ${route.token.id}`)
    return token
  }

  @FieldResolver()
  async feeToken(@Root() route: Route) {
    const manager = await this.tx()
    const token = await manager.findOne(TokenModel, {
      where: { id: route.feeToken.id },
      loadRelationIds: { disableMixedMap: true },
    })
    if (!token) throw new Error(`Can't find token ${route.feeToken.id}`)
    return token
  }
}

const isDefined = <T>(value: T | undefined): value is T => value !== undefined
