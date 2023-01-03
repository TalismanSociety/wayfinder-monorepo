import uniqWith from 'lodash/uniqWith'
import { useEffect } from 'react'

import { XcmBalances } from './useXcmBalances'

export const useAssetsWithBalances = (
  balances: XcmBalances,
  callback: (assets: Array<{ chainId: string; tokenId: string }>) => void
) => {
  useEffect(() => {
    const assets = balances
      .filter(({ amount }) => amount !== '0')
      .map(({ chain, token }) => ({ chainId: chain.id, tokenId: token.id }))
    const uniqueAssets = uniqWith(assets, (a, b) => a.chainId === b.chainId && a.tokenId === b.tokenId)
    callback(uniqueAssets)
  }, [balances]) // eslint-disable-line react-hooks/exhaustive-deps
}
