import type { Balances } from '@talismn/balances'
import pick from 'lodash/pick'
import { useMemo } from 'react'

import { useTokens } from './useWayfinder'

export type XcmBalances = Array<{
  address: string
  chain: { id: string }
  token: { id: string }
  amount: string
}>

export const useXcmBalances = (
  wayfinderSquid: string,
  chaindataBalances: Balances | undefined,
  addressOrAddresses: string | string[]
): XcmBalances => {
  const addresses = useMemo(
    () => (Array.isArray(addressOrAddresses) ? addressOrAddresses : [addressOrAddresses]),
    [addressOrAddresses]
  )

  //
  // extract xcm balances from chaindata balances
  //
  const { tokens } = useTokens(wayfinderSquid)
  const balances = useMemo(
    () =>
      addresses.flatMap((address) =>
        (tokens || []).flatMap((token) =>
          token.chains.map((chainToken) => {
            const emptyBalance = { address, chain: chainToken.chain, token: pick(token, 'id'), amount: '0' }
            if (!chainToken.chaindataId) return emptyBalance
            if (!chaindataBalances) return emptyBalance

            const balances = chaindataBalances.find({ address, tokenId: chainToken.chaindataId })
            return {
              ...emptyBalance,
              amount: [...balances].reduce((total, balance) => total + balance.transferable.planck, 0n).toString(),
            }
          })
        )
      ),
    [addresses, chaindataBalances, tokens]
  )

  return balances
}
