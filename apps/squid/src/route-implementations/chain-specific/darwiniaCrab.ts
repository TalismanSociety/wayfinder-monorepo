import { TypeRegistry } from '@polkadot/types'
import { tokensToPlanck } from '@talismn/util'

import { BuildResult } from '../../server-extension/model'
import type { RouteImplementationProps } from '..'

export const buildDarwiniaCrabTx = ({
  route,
  from,
  to,
  token,
  fromChainToken,
  recipient,
  amount: amountTokens,
}: RouteImplementationProps): BuildResult => {
  if (fromChainToken.isNative !== true)
    throw new Error(`XCM route ${from.name} --${token.symbol}-> ${to.name} is not valid`)

  const amount = tokensToPlanck(amountTokens, token.decimals)
  const accountId = new TypeRegistry().createType('AccountId32', recipient).toHex()
  const destination = {
    V0: { X2: ['Parent', { ParaChain: to.paraId }] },
  }
  const beneficiary = { V0: { X1: { AccountId32: { id: accountId, network: 'Any' } } } }
  const asset = { V0: [{ ConcreteFungible: { amount: amount } }] }
  const feeAssetItem = 0
  const destinationWeightLimit = route.weightLimit === 'Unlimited' ? route.weightLimit : { Limited: route.weightLimit }

  return {
    module: 'polkadotXcm',
    method: 'limitedReserveTransferAssets',
    params: [destination, beneficiary, asset, feeAssetItem, destinationWeightLimit],
  }
}
