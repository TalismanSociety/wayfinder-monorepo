import { AvailableAsset } from '@talismn/wayfinder-types'

export const availableAssets: { [address: string]: AvailableAsset[] } = {
  '13Dg1mYyNddpzDxZZ2ksZeAQxjDAqAzH24bGmBhzs5dQcmwF': [
    {
      chain: 'chain0',
      token: 'token0',
      amount: '1',
    },
    {
      chain: 'chain0',
      token: 'token1',
      amount: '8',
    },
    {
      chain: 'chain2',
      token: 'token2',
      amount: '2',
    },
  ],
  '1YmEYgtfPbwx5Jos1PjKDWRpuJWSpTzytwZgYan6kgiquNS': [
    {
      chain: 'chain1',
      token: 'token1',
      amount: '3',
    },
  ],
}

type AvailableAccount = {
  name: string
  address: string
}

export const availableAccounts: AvailableAccount[] = [
  {
    name: 'Account1',
    address: '13Dg1mYyNddpzDxZZ2ksZeAQxjDAqAzH24bGmBhzs5dQcmwF',
  },
  {
    name: 'Account2',
    address: '1YmEYgtfPbwx5Jos1PjKDWRpuJWSpTzytwZgYan6kgiquNS',
  },
]
