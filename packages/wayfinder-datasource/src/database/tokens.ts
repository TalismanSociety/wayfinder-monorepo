import { Token } from '../types'

type TokenObject = {
  [id: string]: Token
}

const tokens: TokenObject = {
  token1: {
    id: 't1',
    name: 'token1',
    symbol: 't1'
  },
  token2: {
    id: 't2',
    name: 'token2',
    symbol: 't2'
  },
  token3: {
    id: 't3',
    name: 'token3',
    symbol: 't3'
  }
}

export default tokens