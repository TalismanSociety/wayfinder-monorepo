import { tokensToPlanck } from '@talismn/util'

import type { RouteImplementationProps } from '.'

export const xcmPalletReserveTransferAssets = ({ to, token, accountId, amount }: RouteImplementationProps) => {
  const destination = { V0: { X1: { Parachain: to.paraId } } }
  const beneficiary = { V0: { X1: { AccountId32: { id: accountId, network: 'Any' } } } }
  const assets = { V0: [{ ConcreteFungible: { amount: tokensToPlanck(amount, token.decimals) } }] }
  const feeAssetItem = 0

  return {
    module: 'xcmPallet',
    method: 'reserveTransferAssets',
    params: [destination, beneficiary, assets, feeAssetItem],
  }
}
