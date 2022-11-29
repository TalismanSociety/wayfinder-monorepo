import { Chain } from '../types'

type ChainObject = {
  [id: string]: Chain
}

const chains: ChainObject = {
  chain1: {
    id: 'c1',
    name: 'chain1',
  },
  chain2: {
    id: 'c2',
    name: 'chain2',
  },
  chain3: {
    id: 'c3',
    name: 'chain3',
  },
}

export default chains
