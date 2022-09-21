import { useEffect } from 'react'
import useWayfinder from '@talismn/wayfinder-react-hook'
import { WayfinderHookResult, WayfinderConfigProps } from '@talismn/wayfinder-types'
import { availableAccounts, availableAssets } from './config'


/* 
  NOTES -->
  This hook is application specific and used to gather application state and
  pass it into the useWayfinder hook (and subsequently, the wayfinder lib).

  This file also interfaces with the rest of the application when gathering 
  fee information and sending a transaction to the network


  This file this is a demo only and is annotated to provide clarity around
  useage. Certain parts may need to be swapped for actual application logic,
  for example the 'availableAccounts' and 'availableAssets' data
  

  The main purpose of this hook is to consolidate user accounts and tokens
  into a useable format so that the wayfinder knows what is available
*/



// use the wayfinder hook
// gather user acounts on change
const useXChainTransaction = () => {

  // configure the wayfinder -->
  // uri: string;
  // availableAssets?: AvailableAsset[] | undefined;
  // autoSelectValues?: Boolean | undefined;
  const wayfinderConfig: WayfinderConfigProps = {
    uri: 'http://localhost:4350/graphql',
    handleRequestFee: (chain) => {
      return '0.1'
    }, // <-- currently hardcoded this
    handleSendTransaction: (tx) => {
      console.log('TODO: Handle Send Tx', {tx})
      return true
    }
  }

  const wayfinderValues: WayfinderHookResult = useWayfinder(wayfinderConfig)

  const {
    set,
    inputParams
  } = wayfinderValues
  
  // set this when the accounts have loaded
  //  - in reality this will be queried from somewhere 
  useEffect(() => {
    set('account', availableAccounts[0].address)
  }, [])
  
  // fetch the available assets when the account changes
  //  - we can probably migrate this to a hook, which wraps useWayfinder with the ability to 
  //  - lookup assets when the account changes
  useEffect(() => {
    if(!inputParams.account) return
    set('availableAssets', availableAssets[inputParams.account])
  }, [inputParams.account])
  
  
  return {
    ...wayfinderValues,

  }
}

export default useXChainTransaction