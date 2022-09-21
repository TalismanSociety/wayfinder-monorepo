import { AvailableAsset } from '@talismn/wayfinder-types'

export const availableAssets: {[address: string] : AvailableAsset[]} = {
  '11111111111': [
    {
      chain: 'chain0',
      token: 'token0',
      amount: '1'
    },
    {
      chain: 'chain0',
      token: 'token1',
      amount: '8'
    },
    {
      chain: 'chain2',
      token: 'token2',
      amount: '2'
    }
  ],
  '2222222222': [
    {
      chain: 'chain1',
      token: 'token1',
      amount: '3'
    }
  ]
}

type AvailableAccount = {
  name: string
  address: string
}

export const availableAccounts: AvailableAccount[] = [
  {
    name: 'Account1',
    address: '11111111111',
  },
  {
    name: 'account2',
    address: '2222222222',
  }
]