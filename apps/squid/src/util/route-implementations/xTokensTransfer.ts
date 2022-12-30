import { tokensToPlanck } from '@talismn/util'

import type { RouteImplementationProps } from '.'

export const xTokensTransfer = ({ accountId, fromChainToken, token, amount, route }: RouteImplementationProps) => {
  const account = { X1: { AccountId32: { id: accountId, network: 'Any' } } }
  const destination = { interior: account, parents: 1 }

  const { tokenIdent } = fromChainToken
  if (!tokenIdent) throw new Error(`No tokenIdent for token ${token.symbol} (${token.id})`)

  let parsedTokenIdent
  try {
    parsedTokenIdent = JSON.parse(tokenIdent)
  } catch {
    parsedTokenIdent = tokenIdent
  }

  return {
    module: 'xTokens',
    method: 'transfer',
    params: [
      parsedTokenIdent,
      tokensToPlanck(amount, token.decimals),
      { V1: destination },
      route.weightLimit === 'Unlimited' ? route.weightLimit : { Limited: route.weightLimit },
    ],
  }
}
