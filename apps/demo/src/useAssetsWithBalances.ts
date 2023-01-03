import uniqWith from 'lodash/uniqWith'
import { useEffect } from 'react'

import { useXcmBalances } from './useXcmBalances'

export const useAssetsWithBalances = (
  addresses: string | string[],
  callback: (assets: Array<{ chainId: string; tokenId: string }>) => void
) => {
  const balances = useXcmBalances(addresses)

  useEffect(() => {
    const assets = balances
      .filter(({ amount }) => amount !== '0')
      .map(({ chain, token }) => ({ chainId: chain.id, tokenId: token.id }))
    const uniqueAssets = uniqWith(assets, (a, b) => a.chainId === b.chainId && a.tokenId === b.tokenId)
    callback(uniqueAssets)
  }, [balances]) // eslint-disable-line react-hooks/exhaustive-deps
}
