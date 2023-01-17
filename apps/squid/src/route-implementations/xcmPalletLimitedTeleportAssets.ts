import { TypeRegistry } from '@polkadot/types'
import { tokensToPlanck } from '@talismn/util'

import type { RouteImplementationProps } from '.'

export const xcmPalletLimitedTeleportAssets = ({ route, to, token, recipient, amount }: RouteImplementationProps) => {
  const accountId = new TypeRegistry().createType('AccountId32', recipient).toHex()
  const destination = { V1: { interior: { X1: { ParaChain: to.paraId } }, parents: 0 } }
  const beneficiary = { V1: { interior: { X1: { AccountId32: { id: accountId, network: 'Any' } } }, parents: 0 } }
  const assets = {
    V1: [
      { fun: { Fungible: tokensToPlanck(amount, token.decimals) }, id: { Concrete: { interior: 'Here', parents: 0 } } },
    ],
  }
  const feeAssetItem = 0
  const { weightLimit } = route

  return {
    module: 'xcmPallet',
    method: 'limitedTeleportAssets',
    params: [destination, beneficiary, assets, feeAssetItem, weightLimit ?? 'Unlimited'],
  }
}
