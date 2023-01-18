import { TypeRegistry } from '@polkadot/types'
import { tokensToPlanck } from '@talismn/util'

import { BuildResult } from '../../server-extension/model'
import type { RouteImplementationProps } from '..'

export const buildCrustShadowTx = ({
  route,
  to,
  token,
  fromChainToken,
  recipient,
  amount: amountTokens,
}: RouteImplementationProps): BuildResult => {
  const { tokenIdent } = fromChainToken
  if (!fromChainToken.isNative && !tokenIdent) throw new Error(`No tokenIdent for token ${token.symbol} (${token.id})`)

  const currencyId = (() => {
    if (fromChainToken.isNative) return 'SelfReserve'

    try {
      return { OtherReserve: JSON.parse(tokenIdent) }
    } catch {
      return { OtherReserve: tokenIdent }
    }
  })()

  const amount = tokensToPlanck(amountTokens, token.decimals)
  const accountId = new TypeRegistry().createType('AccountId32', recipient).toHex()
  const destination = {
    V1: {
      parents: 1,
      interior: { X2: [{ Parachain: to.paraId }, { AccountId32: { id: accountId, network: 'Any' } }] },
    },
  }
  const destinationWeightLimit = route.weightLimit === 'Unlimited' ? route.weightLimit : { Limited: route.weightLimit }

  return {
    module: 'xTokens',
    method: 'transfer',
    params: [currencyId, amount, destination, destinationWeightLimit],
  }
}
