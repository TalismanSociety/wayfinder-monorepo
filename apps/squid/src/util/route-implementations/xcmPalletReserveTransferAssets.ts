import { tokensToPlanck } from '@talismn/util'

import type { RouteImplementationProps } from '.'

export const xcmPalletReserveTransferAssets = ({ to, token, accountId, amount }: RouteImplementationProps) => {
  const destination = { X1: { Parachain: to.paraId } }
  const account = { X1: { AccountId32: { id: accountId, network: 'Any' } } }
  const asset = [{ ConcreteFungible: { amount: tokensToPlanck(amount, token.decimals) } }]

  return {
    module: 'xcmPallet',
    method: 'reserveTransferAssets',
    params: [{ V0: destination }, { V0: account }, { V0: asset }, 0],
  }
}
