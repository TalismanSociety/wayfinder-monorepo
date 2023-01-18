import { TypeRegistry } from '@polkadot/types'
import { tokensToPlanck } from '@talismn/util'

import { BuildResult } from '../../server-extension/model'
import type { RouteImplementationProps } from '..'

export const buildPhalaKhalaTx = ({
  route,
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
  const destination = {
    parents: 1,
    interior: { X2: [{ Parachain: to.paraId }, { AccountId32: { id: accountId, network: 'Any' } }] },
  }
  const destinationWeightLimit = route.weightLimit

  if (fromChainToken.isNative) {
    const asset = { id: { Concrete: { parents: 0, interior: 'Here' } }, fun: { Fungible: amount } }
    return {
      module: 'xTransfer',
      method: 'transfer',
      params: [asset, destination, destinationWeightLimit],
    }
  }

  // TODO: Figure out where these come from, then integrate them into raw-data instead of hardcoding here
  const generalKeys: Record<string, string> = {
    KUSD: '0x0081',
    KAR: '0x0080',
  }
  const generalKey = generalKeys[token.symbol] ?? undefined
  if (!generalKey) throw new Error(`XCM route ${from.name} --${token.symbol}-> ${to.name} is not valid`)

  const asset = {
    id: { Concrete: { parents: 1, interior: { X2: [{ Parachain: to.paraId }, { GeneralKey: generalKey }] } } },
    fun: { Fungible: amount },
  }

  return {
    module: 'xTransfer',
    method: 'transfer',
    params: [asset, destination, destinationWeightLimit],
  }
}
