import { TypeRegistry } from '@polkadot/types'
import { tokensToPlanck } from '@talismn/util'

import { BuildResult } from '../../server-extension/model'
import type { RouteImplementationProps } from '..'

export const buildAstarOrShidenTx = ({
  from,
  to,
  token,
  fromChainToken,
  recipient,
  amount: amountTokens,
}: RouteImplementationProps): BuildResult => {
  const { tokenIdent } = fromChainToken
  if (!fromChainToken.isNative && !tokenIdent) throw new Error(`No tokenIdent for token ${token.symbol} (${token.id})`)

  const amount = tokensToPlanck(amountTokens, token.decimals)

  const accountId = new TypeRegistry().createType('AccountId32', recipient).toHex()
  const destination = { V1: { parents: 1, interior: { X1: { Parachain: to.paraId } } } }
  const account = { V1: { parents: 0, interior: { X1: { AccountId32: { id: accountId, network: 'Any' } } } } }
  const feeAssetItem = 0

  if (fromChainToken.isNative) {
    const asset = { V1: [{ id: { Concrete: { parents: 0, interior: 'Here' } }, fun: { Fungible: amount } }] }
    return {
      module: 'polkadotXcm',
      method: 'reserveTransferAssets',
      params: [destination, account, asset, feeAssetItem],
    }
  }

  // TODO: Figure out where these come from, then integrate them into raw-data instead of hardcoding here
  const generalKeys: Record<string, string> = {
    // to karura
    KUSD: '0x0081',
    // to acala
    ACA: '0x0000',
    AUSD: '0x0001',
    LDOT: '0x0003',
  }
  const generalKey = generalKeys[token.symbol] ?? undefined
  if (!generalKey) throw new Error(`XCM route ${from.name} --${token.symbol}-> ${to.name} is not valid`)

  const asset = {
    V1: [
      {
        id: { Concrete: { parents: 1, interior: { X2: [{ Parachain: to.paraId }, { GeneralKey: generalKey }] } } },
        fun: { Fungible: amount },
      },
    ],
  }

  return {
    module: 'polkadotXcm',
    method: 'reserveTransferAssets',
    params: [destination, account, asset, feeAssetItem],
  }
}
