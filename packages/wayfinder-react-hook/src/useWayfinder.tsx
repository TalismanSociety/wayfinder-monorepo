import { useEffect, useState } from 'react'
import WayFinder, {initWayfinderState, SubscriptionCallback } from 'wayfinder-lib'
import { IProps, TReturn } from './types'

const wayfinderInstance = new WayFinder()

const useWayfinder = (props?: IProps): TReturn => {

  const [wayfinderState, setWayfinderState] = useState<SubscriptionCallback>(initWayfinderState)

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