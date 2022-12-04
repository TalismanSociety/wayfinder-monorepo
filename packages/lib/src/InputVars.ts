import { GenericObject } from '@talismn/wayfinder-types'

import { SubscriptionService } from './SubscriptionService'

type TValue<T> = T | null

class Variable<T> {
  public _initialValue: TValue<T> = null
  public _value: TValue<T> = null

  constructor(defaultValue?: TValue<T>) {
    this._initialValue = defaultValue || null
    this._value = defaultValue || null
  }

  set value(value: TValue<T>) {
    this._value = value
  }

  get value(): T {
    return this._value as T
  }

  reset() {
    this._value = this._initialValue
  }
}

type VariableSet = {
  [key: string]: Variable<any>
}

type InputSet = {
  [key: string]: any
}

export class InputVars {
  private vars: VariableSet = {}
  private subscriptionService = new SubscriptionService<GenericObject>()

  constructor(vars: InputSet) {
    Object.keys(vars).forEach((key) => {
      const val = vars[key]
      this.vars[key] = new Variable<typeof val>(val)
    })
    this.triggerUpdate()
  }

  // set a value - make sure it's in the set of allowed values
  public set(key: string | GenericObject, value: any, muteUpdate?: Boolean) {
    if (typeof key === 'object') {
      Object.keys(key).forEach((_key) => {
        if (!this.vars[_key]) return
        this.vars[_key].value = key[_key]
      })
      muteUpdate !== true && this.triggerUpdate()
    } else {
      if (!this.vars[key]) return
      this.vars[key].value = value
      muteUpdate !== true && this.triggerUpdate()
    }
  }

  get(key: string) {
    return this.vars[key].value
  }

  all() {
    const all: { [key: string]: any } = {}
    Object.keys(this.vars).forEach((key) => {
      all[key] = this.vars[key].value
    })
    return all
  }

  // itterate through all vars and reset back to default value
  public reset(fields?: string[]) {
    Object.keys(this.vars).forEach((key: string) => {
      // only reset the fields specified, otherwise all if not specified
      ;(!fields || fields.includes(key)) && this.vars[key].reset()
    })

    this.triggerUpdate()
  }

  // subscription callback
  private triggerUpdate() {
    const returnObj: { [key: string]: any } = {}
    Object.keys(this.vars).forEach((key) => (returnObj[key] = this.vars[key].value))
    this.subscriptionService.fire(returnObj)
  }

  // subscription service
  public subscribe(cb: (vals: any) => void) {
    const unsub = this.subscriptionService.subscribe(cb)
    this.triggerUpdate()
    return unsub
  }
}
