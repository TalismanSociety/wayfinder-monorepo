import useWayfinder from '@talismn/wayfinder-react-hook'
import { WayfinderConfigProps, WayfinderHookResult } from '@talismn/wayfinder-types'
import { useEffect } from 'react'

import { availableAccounts, availableAssets } from './config' // <-- this is fake data

/*
  ---> NOTES FOR DEVS
  This hook is application specific and used to gather application state and
  pass it into the useWayfinder hook (and subsequently, the wayfinder lib).

  This file also interfaces with the rest of the application when gathering
  fee information and propagating a transaction to the network.

  The wayfinder does not know how to send your transaction, but only crafts it
  to a point it can be sent. You'll need to use p.js or an RPC factory in
  order to propagate the tx and watch the status.

  This file this is a demo only and is annotated to provide clarity around
  useage. Certain parts may need to be swapped for actual application logic,
  for example the 'availableAccounts' and 'availableAssets' data

  The main purpose of this hook is to consolidate user accounts and tokens
  into a useable format so that the wayfinder knows what is available
*/

const useXChainTransaction = () => {
  // ---> 1. DEFINE YOUR WAYFINDER CONFIG OPTIONS
  const wayfinderConfig: WayfinderConfigProps = {
    // uri of the wayfinder endpoint
    uri: 'http://localhost:4350/graphql',

    // [TODO] handle fetching the fee
    handleRequestFee: (chain) => '0.1',

    // [TODO] handle sending the tx
    handleSendTransaction: (tx) => {
      console.log('TODO: Handle Send Tx', { tx })
      return true
    },
  }

  // ---> 2. INIT YOUR WAYFINDER
  const wayfinderValues: WayfinderHookResult = useWayfinder(wayfinderConfig)

  // ---> 3. LOAD YOUR FIRST ACCOUNT
  useEffect(() => {
    wayfinderValues.set('account', availableAccounts[0].address)
  }, [])

  // ---> 4. INJECT AVAILABLE CHAINS/TOKENS WHEN ACCOUNT CHANGES
  useEffect(() => {
    const account = wayfinderValues.inputParams.account
    if (!account) return
    wayfinderValues.set('availableAssets', availableAssets[account])
  }, [wayfinderValues.inputParams.account])

  // ---> 5. RETURN THE THINGS
  return {
    ...wayfinderValues,
    availableAccounts,
  }
}

export default useXChainTransaction
