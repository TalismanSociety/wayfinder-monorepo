import { Arg, Query, Resolver } from 'type-graphql'
import { EntityManager } from 'typeorm'

import {
  Chain as ChainModel,
  ChainToken as ChainTokenModel,
  Route as RouteModel,
  Token as TokenModel,
} from '../../model'
import { getRouteImplementation } from '../../route-implementations'
import { BuildResult } from '../model'

@Resolver()
export class BuildResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Query(() => BuildResult)
  async build(
    @Arg('route') routeId: string,
    @Arg('accountId') accountId: `0x${string}`,
    @Arg('amount') amount: string
  ): Promise<BuildResult> {
    const manager = await this.tx()
    const loadRelationIds = { disableMixedMap: true }

    // fetch the route
    const route = await manager.findOne(RouteModel, { where: { id: routeId }, loadRelationIds })
    if (!route) throw new Error(`Can't find route ${routeId}`)

    // determine the route relation ids to fetch
    const fromId = route.from.id
    const toId = route.to.id
    const tokenId = route.token.id
    const feeTokenId = route.feeToken.id

    // fetch the route's relations
    const [from, to, token, feeToken, fromChainToken, toChainToken, feeChainToken] = await Promise.all([
      manager.findOne(ChainModel, { where: { id: fromId }, loadRelationIds }),
      manager.findOne(ChainModel, { where: { id: toId }, loadRelationIds }),
      manager.findOne(TokenModel, { where: { id: tokenId }, loadRelationIds }),
      manager.findOne(TokenModel, { where: { id: feeTokenId }, loadRelationIds }),
      manager.findOne(ChainTokenModel, { where: { chain: { id: fromId }, token: { id: tokenId } }, loadRelationIds }),
      manager.findOne(ChainTokenModel, { where: { chain: { id: toId }, token: { id: tokenId } }, loadRelationIds }),
      manager.findOne(ChainTokenModel, {
        where: { chain: { id: fromId }, token: { id: feeTokenId } },
        loadRelationIds,
      }),
    ])

    // check no relations are missing
    if (!from) throw new Error(`Can't find 'from' chain ${fromId} in route ${route.id}`)
    if (!to) throw new Error(`Can't find 'to' chain ${toId} in route ${route.id}`)
    if (!token) throw new Error(`Can't find token ${tokenId} in route ${route.id}`)
    if (!feeToken) throw new Error(`Can't find feeToken ${feeTokenId} in route ${route.id}`)
    if (!fromChainToken) throw new Error(`Can't find fromChainToken for chain ${fromId} and token ${tokenId}`)
    if (!toChainToken) throw new Error(`Can't find toChainToken for chain ${toId} and token ${tokenId}`)
    if (!feeChainToken) throw new Error(`Can't find feeChainToken for chain ${fromId} and token ${feeTokenId}`)

    // fetch the route implementation
    const routeImplementation = getRouteImplementation(from, to)
    if (!routeImplementation)
      throw new Error(`TX construction for XCM route ${from.name} --${token.symbol}-> ${to.name} is not implemented`)

    // return the results
    return routeImplementation({
      route,
      from,
      to,
      token,
      feeToken,
      fromChainToken,
      toChainToken,
      feeChainToken,
      accountId,
      amount,
    })
  }
}
