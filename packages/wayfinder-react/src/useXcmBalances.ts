import { EvmNativeModule } from '@talismn/balances-evm-native'
import {
  useChaindata,
  useBalances as useChaindataBalances,
  useTokens as useChaindataTokens,
} from '@talismn/balances-react'
import { SubNativeModule } from '@talismn/balances-substrate-native'
import { SubOrmlModule } from '@talismn/balances-substrate-orml'
import { Token } from '@talismn/chaindata-provider'
import pick from 'lodash/pick'
import { useMemo } from 'react'

import { useTokens } from './useWayfinder'

// import { balanceModules } from '@talismn/balances-default-modules'
const balanceModules = [SubNativeModule, SubOrmlModule, EvmNativeModule]

export type XcmBalances = Array<{
  address: string
  chain: { id: string }
  token: { id: string }
  amount: string
}>

export const useXcmBalances = (addressOrAddresses: string | string[]): XcmBalances => {
  //
  // fetch chaindata balances
  //
  const chaindata = useChaindata()

  const chaindataTokens = useChaindataTokens(chaindata)
  const chaindataTokenIds = useMemo(
    () =>
      Object.values(chaindataTokens)
        .filter(({ isTestnet }) => !isTestnet)
        .map(({ id }) => id),
    [chaindataTokens]
  )

  const addresses = useMemo(
    () => (Array.isArray(addressOrAddresses) ? addressOrAddresses : [addressOrAddresses]),
    [addressOrAddresses]
  )
  const addressesByToken = useAddressesByToken(addresses, chaindataTokenIds)
  const chaindataBalances = useChaindataBalances(balanceModules, chaindata, addressesByToken)

  //
  // extract xcm balances from chaindata balances
  //
  const { tokens } = useTokens()
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

/**
 * Given an array of `addresses` and an array of `tokenIds`, will return an `addressesByToken` map like so:
 *
 *     {
 *       [tokenIdOne]: [addressOne, addressTwo, etc]
 *       [tokenIdTwo]: [addressOne, addressTwo, etc]
 *       [etc]:        [addressOne, addressTwo, etc]
 *     }
 */
function useAddressesByToken(addresses: string[] | null, tokenIds: Token['id'][]) {
  return useMemo(() => {
    if (addresses === null) return {}
    return Object.fromEntries(tokenIds.map((tokenId) => [tokenId, addresses]))
  }, [addresses, tokenIds])
}
