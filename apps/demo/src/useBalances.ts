import { tokensToPlanck } from '@talismn/util'
import pick from 'lodash/pick'
import { useMemo } from 'react'

import { useSources, useTokens } from './useWayfinder'

const hardcodedBalances: Array<{ address: string; chain: string; token: string; amount: string }> = [
  {
    address: '5EHNsSHuWrNMYgx3bPhsRVLG77DX8sS8wZrnbtieJzbtSZr9',
    chain: 'Polkadot',
    token: 'DOT',
    amount: '10',
  },
  {
    address: '5EHNsSHuWrNMYgx3bPhsRVLG77DX8sS8wZrnbtieJzbtSZr9',
    chain: 'Acala',
    token: 'DOT',
    amount: '20',
  },
  {
    address: '5EHNsSHuWrNMYgx3bPhsRVLG77DX8sS8wZrnbtieJzbtSZr9',
    chain: 'Statemine',
    token: 'KSM',
    amount: '2',
  },
  {
    address: '5EHNsSHuWrNMYgx3bPhsRVLG77DX8sS8wZrnbtieJzbtSZr9',
    chain: 'Statemine',
    token: 'RMRK',
    amount: '10',
  },
  {
    address: '5CcU6DRpocLUWYJHuNLjB4gGyHJrkWuruQD5XFbRYffCfSAP',
    chain: 'Karura',
    token: 'KSM',
    amount: '4',
  },
  {
    address: '5CcU6DRpocLUWYJHuNLjB4gGyHJrkWuruQD5XFbRYffCfSAP',
    chain: 'Bifrost',
    token: 'BNC',
    amount: '14',
  },
]

export const useBalances = (addresses: string | string[]) => {
  const { sources } = useSources()
  const { tokens } = useTokens()
  const filtered = useMemo(
    () =>
      hardcodedBalances.filter((balance) =>
        (Array.isArray(addresses) ? addresses : [addresses]).includes(balance.address)
      ),
    [addresses]
  )

  const parsed = useMemo(
    () =>
      filtered.flatMap(({ address, chain: chainName, token: tokenName, amount }) => {
        const chain = sources?.find(({ name }) => chainName === name)
        const token = tokens?.find(({ name }) => tokenName === name)

        if (!chain?.id || !token?.id) return []

        const balance = {
          address,
          chain: pick(chain, 'id'),
          token: pick(token, 'id'),
          amount: tokensToPlanck(amount, token?.decimals ?? 0),
        }

        return [balance]
      }),

    [filtered, sources, tokens]
  )

  return parsed
}
