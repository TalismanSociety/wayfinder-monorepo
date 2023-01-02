import type { RawData } from './_types'

export const chainTokens: RawData['chainTokens'] = [
  {
    chain: 'interlay',
    token: 'INTR',
    isNative: true,
    existentialDeposit: '0',
    tokenIdent: JSON.stringify({ Token: 'INTR' }),
  },
  {
    chain: 'interlay',
    token: 'IBTC',
    isNative: false,
    existentialDeposit: '0',
    tokenIdent: JSON.stringify({ Token: 'IBTC' }),
  },
]

const weightLimit = '5000000000'
export const routes: RawData['routes'] = [
  { to: 'acala', token: 'INTR', feeToken: 'INTR', fee: '92696000', weightLimit },
  { to: 'acala', token: 'IBTC', feeToken: 'IBTC', fee: '9', weightLimit },
].map((route) => ({ from: 'interlay', ...route }))
