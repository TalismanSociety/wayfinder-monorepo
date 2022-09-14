import { useEffect, useState } from 'react'
import WayFinder, { defaultWayfinderCallbackResult } from '@talismn/wayfinder-lib'
import { WayfinderConfigProps, WayfinderHookResult, WayfinderCallbackResult, AvailableAsset } from '@talismn/wayfinder-types'

const wayfinderInstance = new WayFinder()

const defaultProps = {
  uri: 'http://localhost:4350/graphql'
}

const useWayfinder = (props: WayfinderConfigProps = defaultProps): WayfinderHookResult => {


  const [wayfinderState, setWayfinderState] = useState<WayfinderCallbackResult>(defaultWayfinderCallbackResult)

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

export default useWayfinder