import uniqWith from 'lodash/uniqWith'
import { useEffect } from 'react'

import { useBalances } from './useBalances'

export const useAssetsWithBalances = (
  addresses: string | string[],
  callback: (assets: Array<{ chainId: string; tokenId: string }>) => void
) => {
  const balances = useBalances(addresses)

  useEffect(() => {
    const assets = balances.map(({ chain, token }) => ({ chainId: chain.id, tokenId: token.id }))
    const uniqueAssets = uniqWith(assets, (a, b) => a.chainId === b.chainId && a.tokenId === b.tokenId)
    callback(uniqueAssets)
  }, [balances]) // eslint-disable-line react-hooks/exhaustive-deps
}
