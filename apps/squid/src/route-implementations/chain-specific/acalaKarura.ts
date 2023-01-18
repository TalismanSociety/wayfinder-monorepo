import { TypeRegistry } from '@polkadot/types'
import { tokensToPlanck } from '@talismn/util'

import { BuildResult } from '../../server-extension/model'
import type { RouteImplementationProps } from '..'

export const buildAcalaOrKaruraTx = ({
  route,
  to,
  token,
  feeToken,
  fromChainToken,
  recipient,
  amount: amountTokens,
}: RouteImplementationProps): BuildResult => {
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
  const destinationWeightLimit = route.weightLimit === 'Unlimited' ? route.weightLimit : { Limited: route.weightLimit }

  if (['Moonbeam', 'Moonriver'].includes(to.name)) {
    // eslint-disable-next-line no-unreachable
    const destination = {
      V1: {
        parents: 1,
        interior: { X2: [{ Parachain: to.paraId }, { AccountKey20: { key: recipient, network: 'Any' } }] },
      },
    }

    if (['KAR', 'KUSD', 'MOVR', 'ACA', 'AUSD', 'GLMR'].includes(token.symbol)) {
      return {
        module: 'xTokens',
        method: 'transfer',
        params: [currencyId, amount, destination, destinationWeightLimit],
      }
    }
    return {
      module: 'xTokens',
      method: 'transferMulticurrencies',
      params: [
        [
          [currencyId, amount],
          [{ Token: feeToken.symbol }, tokensToPlanck(route.fee ?? 0, feeToken.decimals)],
        ],
        1,
        destination,
        destinationWeightLimit,
      ],
    }
  }

  const accountId = new TypeRegistry().createType('AccountId32', recipient).toHex()

  if (['Statemine', 'Statemint'].includes(to.name)) {
    const destination = {
      V1: {
        parents: 1,
        interior: { X2: [{ Parachain: to.paraId }, { AccountId32: { id: accountId, network: 'Any' } }] },
      },
    }

    return {
      module: 'xTokens',
      method: 'transferMulticurrencies',
      params: [
        [
          [currencyId, amount],
          [{ Token: feeToken.symbol }, tokensToPlanck(route.fee ?? 0, feeToken.decimals)],
        ],
        1,
        destination,
        destinationWeightLimit,
      ],
    }
  }

  if (['Polkadot', 'Kusama'].includes(to.name)) {
    const destination = { V1: { interior: { X1: { AccountId32: { id: accountId, network: 'Any' } } }, parents: 1 } }

    return {
      module: 'xTokens',
      method: 'transfer',
      params: [currencyId, amount, destination, destinationWeightLimit],
    }
  }

  const destination = {
    V1: {
      parents: 1,
      interior: { X2: [{ Parachain: to.paraId }, { AccountId32: { id: accountId, network: 'Any' } }] },
    },
  }
  return {
    module: 'xTokens',
    method: 'transfer',
    params: [currencyId, amount, destination, destinationWeightLimit],
  }
}
