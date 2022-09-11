import { useEffect, useState } from 'react'
import WayFinder, { defaultWayfinderCallbackResult } from '@talismn/wayfinder-lib'
import { WayfinderConfigProps, WayfinderHookResult, WayfinderCallbackResult } from '@talismn/wayfinder-types'

const wayfinderInstance = new WayFinder({uri: 'http://localhost:4350/graphql'})

const useWayfinder = (props: WayfinderConfigProps = {}): WayfinderHookResult => {

  const {
    availableAssets,
    autoSelectValues
  } = props

  const [wayfinderState, setWayfinderState] = useState<WayfinderCallbackResult>(defaultWayfinderCallbackResult)

  useEffect(() => {
    wayfinderInstance.configure({availableAssets, autoSelectValues})
  }, [availableAssets])


  useEffect(() => {
    const unsub = wayfinderInstance.subscribe(setWayfinderState)
    return () => unsub()
  }, [])

  return {
    ...wayfinderState,
    set: (key: string, val: string|undefined) => wayfinderInstance.setFilter(key, val),
    clear: () => wayfinderInstance.reset(),
  }
}

export default useWayfinder