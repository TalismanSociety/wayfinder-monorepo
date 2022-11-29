import { GenericObject } from '@talismn/wayfinder-types'

class ChangeMon {
  // keep a state hash in order to minimise callbacks
  private state: GenericObject = {}

  public hasChanged(values: GenericObject) {
    const changeditems: string[] = Object.keys(values).filter((key) => {
      const existingVal = this.state[key]
      const newVal = values[key]
      const changed = existingVal !== newVal

      // if we have changed, set the val
      if (!!changed) {
        this.state[key] = newVal
      }

      return changed
    })

    return changeditems.length > 0
  }
}

export default ChangeMon
