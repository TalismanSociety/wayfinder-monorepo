import { v4 as uuidv4 } from 'uuid'

import { Chain, ChainToken, Route, Token } from '../../../../model'
import { rawData } from '../raw-data'
import type { RawData } from '../raw-data/_types'

export const parseRawData = (rawData: RawData) => {
  const debug = (object: any) => JSON.stringify(object, null, 2)

  const chainUuids: Map<string, string> = new Map()
  const tokenUuids: Map<string, string> = new Map()

  const chains: Chain[] = Object.entries(rawData.chains).map(
    ([tempId, chain]) => new Chain({ id: chainUuids.set(tempId, uuidv4()).get(tempId), ...chain })
  )

  const tokens: Token[] = Object.entries(rawData.tokens).map(
    ([tempId, token]) => new Token({ id: tokenUuids.set(tempId, uuidv4()).get(tempId), ...token })
  )

  const chainTokens: ChainToken[] = rawData.chainTokens.map((rawToken) => {
    const { chain: chainTempId, token: tokenTempId, ...chainToken } = rawToken

    const chain = chains.find(({ id }) => id === chainUuids.get(chainTempId))
    const token = tokens.find(({ id }) => id === tokenUuids.get(tokenTempId))

    if (!chain)
      throw new Error(`Invalid chainToken config: can't find chain ${chainTempId} in token:\n${debug(rawToken)}`)
    if (!token)
      throw new Error(`Invalid chainToken config: can't find token ${tokenTempId} in token:\n${debug(rawToken)}`)

    return new ChainToken({ id: uuidv4(), chain, token, ...chainToken })
  })

  const routes: Route[] = rawData.routes.map((rawRoute) => {
    const { from: fromTempId, to: toTempId, token: tokenTempId, feeToken: feeTokenTempId, ...route } = rawRoute

    const from = chains.find(({ id }) => id === chainUuids.get(fromTempId))
    const to = chains.find(({ id }) => id === chainUuids.get(toTempId))
    const token = tokens.find(({ id }) => id === tokenUuids.get(tokenTempId))
    const feeToken = tokens.find(({ id }) => id === tokenUuids.get(feeTokenTempId))

    if (!from) throw new Error(`Invalid route config: can't find chain ${fromTempId} in route:\n${debug(rawRoute)}`)
    if (!to) throw new Error(`Invalid route config: can't find chain ${toTempId} in route:\n${debug(rawRoute)}`)
    if (!token) throw new Error(`Invalid route config: can't find token ${tokenTempId} in route:\n${debug(rawRoute)}`)
    if (!feeToken)
      throw new Error(`Invalid route config: can't find token ${feeTokenTempId} in route:\n${debug(rawRoute)}`)

    const chainHasToken = (testChain: Chain, testToken: Token) =>
      chainTokens.find(({ chain, token }) => chain.id === testChain.id && token.id === testToken.id)

    if (!chainHasToken(from, token))
      throw new Error(
        `Invalid route config: token ${token.name} doesn't exist on chain ${from.name} in route:\n${debug(rawRoute)}`
      )
    if (!chainHasToken(to, token))
      throw new Error(
        `Invalid route config: token ${token.name} doesn't exist on chain ${to.name} in route:\n${debug(rawRoute)}`
      )
    if (!chainHasToken(from, feeToken))
      throw new Error(
        `Invalid route config: token ${feeToken.name} doesn't exist on chain ${from.name} in route:\n${debug(rawRoute)}`
      )
    if (!chainHasToken(to, feeToken))
      throw new Error(
        `Invalid route config: token ${feeToken.name} doesn't exist on chain ${to.name} in route:\n${debug(rawRoute)}`
      )

    return new Route({ id: uuidv4(), from, to, token, feeToken, ...route })
  })

  return { chains, tokens, chainTokens, routes }
}

export const oldFormatAdaptor = parseRawData(rawData).routes.map((route) => ({
  id: route.id,
  source: { id: route.from.id, name: route.from.name },
  destination: { id: route.to.id, name: route.to.name },
  tokens: [{ id: route.token.id, name: route.token.name, symbol: route.token.symbol }],
}))
