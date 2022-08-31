import { Pallet, Param } from '../types'

type PalletObject = {
  [key: string]: Pallet
}

const baseParams: { [key: string]: Param } = {
  sourceChain: {
    key: 'sourceChain',
    name: 'Source Chain',
    type: 'string', //<- how to do this? I want to use type `Chain`
  },
  destinationChain: {
    key: 'destinationChain',
    name: 'Destination Chain',
    type: 'string', //<- how to do this?
  },
  token: {
    key: 'token',
    name: 'Token',
    type: 'string', //<- how to do this?
  },
  amount: {
    key: 'amount',
    name: 'Amount',
    type: 'number', //<- how to do this?
  },
}

const pallets: PalletObject = {
  pallet1: {
    id: 'p1',
    name: 'pallet1',
    method: 'aaa',
    params: baseParams
  },
  pallet2: {
    id: 'p2',
    name: 'pallet2',
    method: 'aaa',
    params: baseParams
  }
}

export default pallets