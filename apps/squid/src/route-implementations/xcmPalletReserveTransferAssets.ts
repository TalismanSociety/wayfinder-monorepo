import { TypeRegistry } from '@polkadot/types'
import { tokensToPlanck } from '@talismn/util'

import type { RouteImplementationProps } from '.'

export const xcmPalletReserveTransferAssets = ({ to, token, recipient, amount }: RouteImplementationProps) => {
  const accountId = new TypeRegistry().createType('AccountId32', recipient).toHex()
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
