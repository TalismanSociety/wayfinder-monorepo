import { TypeRegistry } from '@polkadot/types'
import { tokensToPlanck } from '@talismn/util'

import { BuildResult } from '../../server-extension/model'
import type { RouteImplementationProps } from '..'

export const buildStatemintOrStatemineTx = ({
  route,
  from,
  to,
  token,
  fromChainToken,
  recipient,
  amount,
}: RouteImplementationProps): BuildResult => {
  const accountId = new TypeRegistry().createType('AccountId32', recipient).toHex()

  if (['Polkadot', 'Kusama'].includes(to.name)) {
    if (fromChainToken.isNative !== true)
      throw new Error(`XCM route ${from.name} --${token.symbol}-> ${to.name} is not valid`)

    const destination = { V1: { interior: 'Here', parents: 1 } }
    const beneficiary = { V1: { interior: { X1: { AccountId32: { id: accountId, network: 'Any' } } }, parents: 0 } }
    const assets = {
      V1: [
        {
          fun: { Fungible: tokensToPlanck(amount, token.decimals) },
          id: { Concrete: { interior: 'Here', parents: 1 } },
        },
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

  if (['Acala', 'Karura'].includes(to.name)) {
    if (fromChainToken.isNative === true)
      throw new Error(`XCM route ${from.name} --${token.symbol}-> ${to.name} is not valid`)
    if (fromChainToken.tokenIdent === null || fromChainToken.tokenIdent === undefined)
      throw new Error(`XCM route ${from.name} --${token.symbol}-> ${to.name} is not valid`)

    const destination = { V0: { X2: ['Parent', { Parachain: to.paraId }] } }
    const beneficiary = { V0: { X1: { AccountId32: { id: accountId, network: 'Any' } } } }
    const assets = {
      V0: [
        {
          ConcreteFungible: {
            id: { X2: [{ PalletInstance: 50 }, { GeneralIndex: fromChainToken.tokenIdent }] },
            amount: tokensToPlanck(amount, token.decimals),
          },
        },
      ],
    }
    const feeAssetItem = 0
    const { weightLimit } = route

    return {
      module: 'polkadotXcm',
      method: 'limitedReserveTransferAssets',
      params: [destination, beneficiary, assets, feeAssetItem, weightLimit],
    }
  }

  throw new Error(`XCM route ${from.name} --${token.symbol}-> ${to.name} is not valid`)
}
