import { WayFinder, defaultWayfinderSubscriptionResult } from '@talismn/wayfinder-lib'
import { WayfinderConfigProps, WayfinderHookResult, WayfinderSubscriptionResult } from '@talismn/wayfinder-types'
import { useEffect, useState } from 'react'

const wayfinderInstance = new WayFinder()

export const useWayfinder = (props: WayfinderConfigProps): WayfinderHookResult => {
  const [wayfinderState, setWayfinderState] = useState<WayfinderSubscriptionResult>(defaultWayfinderSubscriptionResult)

  useEffect(() => {
    wayfinderInstance.configure(props)
  }, [props])

  useEffect(() => {
    const unsub = wayfinderInstance.subscribe(setWayfinderState)
    return () => unsub()
  }, [])

  return {
    ...wayfinderState,
    set: (key, val) => wayfinderInstance.setFilter(key, val),
    clear: () => wayfinderInstance.reset(),
  }
}