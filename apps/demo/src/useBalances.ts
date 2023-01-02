import { tokensToPlanck } from '@talismn/util'
import pick from 'lodash/pick'
import { useMemo } from 'react'

import { useSources, useTokens } from './useWayfinder'

// TODO: Fetch balances instead of using hardcoded list
const hardcodedBalances: Array<{ address: string; chain: string; token: string; amount: string }> = [
  // talisman dev (old)
  {
    address: '5EHNsSHuWrNMYgx3bPhsRVLG77DX8sS8wZrnbtieJzbtSZr9',
    chain: 'Polkadot',
    token: 'DOT',
    amount: '1.0830',
  },
  {
    address: '5EHNsSHuWrNMYgx3bPhsRVLG77DX8sS8wZrnbtieJzbtSZr9',
    chain: 'Kusama',
    token: 'KSM',
    amount: '0.1019',
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
    amount: '20',
  },
  {
    address: '5EHNsSHuWrNMYgx3bPhsRVLG77DX8sS8wZrnbtieJzbtSZr9',
    chain: 'Statemine',
    token: 'RMRK',
    amount: '20',
  },
  // talisman dev
  {
    address: '5CcU6DRpocLUWYJHuNLjB4gGyHJrkWuruQD5XFbRYffCfSAP',
    chain: 'Polkadot',
    token: 'DOT',
    amount: '35.3366',
  },
  {
    address: '5CcU6DRpocLUWYJHuNLjB4gGyHJrkWuruQD5XFbRYffCfSAP',
    chain: 'Kusama',
    token: 'KSM',
    amount: '7.5003',
  },
  {
    address: '5CcU6DRpocLUWYJHuNLjB4gGyHJrkWuruQD5XFbRYffCfSAP',
    chain: 'Acala',
    token: 'DOT',
    amount: '2.7461471582',
  },
  {
    address: '5CcU6DRpocLUWYJHuNLjB4gGyHJrkWuruQD5XFbRYffCfSAP',
    chain: 'Karura',
    token: 'KSM',
    amount: '20',
  },
  {
    address: '5CcU6DRpocLUWYJHuNLjB4gGyHJrkWuruQD5XFbRYffCfSAP',
    chain: 'Bifrost',
    token: 'BNC',
    amount: '20',
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
