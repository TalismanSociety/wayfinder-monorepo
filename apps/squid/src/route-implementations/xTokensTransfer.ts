import { tokensToPlanck } from '@talismn/util'

import type { RouteImplementationProps } from '.'

export const xTokensTransfer = ({
  accountId,
  fromChainToken,
  token,
  amount: amountTokens,
  route,
}: RouteImplementationProps) => {
  const { tokenIdent } = fromChainToken
  if (!tokenIdent) throw new Error(`No tokenIdent for token ${token.symbol} (${token.id})`)

  const currencyId = (() => {
    try {
      return JSON.parse(tokenIdent)
    } catch {
      return tokenIdent
    }
  })()

  const amount = tokensToPlanck(amountTokens, token.decimals)
  const account = { X1: { AccountId32: { id: accountId, network: 'Any' } } }
  const destination = { V1: { interior: account, parents: 1 } }
  const destinationWeightLimit = route.weightLimit === 'Unlimited' ? route.weightLimit : { Limited: route.weightLimit }

  return {
    module: 'xTokens',
    method: 'transfer',
    params: [currencyId, amount, destination, destinationWeightLimit],
  }
}
