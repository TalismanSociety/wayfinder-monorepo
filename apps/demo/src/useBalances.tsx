import { Balances } from '@talismn/balances'
import { EvmNativeModule } from '@talismn/balances-evm-native'
import {
  useChaindata,
  useBalances as useChaindataBalances,
  useTokens as useChaindataTokens,
} from '@talismn/balances-react'
import { SubNativeModule } from '@talismn/balances-substrate-native'
import { SubOrmlModule } from '@talismn/balances-substrate-orml'
import { Token } from '@talismn/chaindata-provider'
import { useMemo } from 'react'

// import { balanceModules } from '@talismn/balances-default-modules'
const balanceModules = [SubNativeModule, SubOrmlModule, EvmNativeModule]

export const useBalances = (addressOrAddresses: string | string[]): Balances => {
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

  return chaindataBalances || new Balances([])
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
