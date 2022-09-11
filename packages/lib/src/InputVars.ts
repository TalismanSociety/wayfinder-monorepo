import { v4 as uuidv4 } from 'uuid';

type TValue<T> = T|null

class Variable<T>{
  
  public _initialValue: TValue<T> = null
  public _value: TValue<T> = null

  constructor(defaultValue?: TValue<T>){
    this._initialValue = defaultValue||null
    this._value = defaultValue||null
  }

  set value(value: TValue<T>){
    this._value = value
  }

  get value(): T {
    return this._value as T
  }

  reset(){
    this._value = this._initialValue
  }
}


type VariableSet = {
  [key: string]: Variable<string>
}

type InputSet = {
  [key: string]: any
}

class QueryVars {

  private vars: VariableSet = {}
  private callbackStore: {[id: string]: (val: {[id: string]: any}) => void} = {}
  
  constructor(vars: InputSet){
    Object.keys(vars).forEach(key => {
      const val = vars[key]
      this.vars[key] = new Variable(val)
    })
    this.triggerUpdate()
  }

  // set a value - make sure it's in the set of allowed values
  set(key: string, value: any){
    if(!!this.vars[key]){
      this.vars[key].value = value
      this.triggerUpdate()
    }
  }

  get(key: string) {
    return this.vars[key].value
  }
  
  // itterate through all vars and reset back to default value
  public reset(fields?: string[]){
    Object.keys(this.vars).forEach((key: string) => {
      
      // only reset the fields specified, otherwise all if not specified
      (!fields || fields.includes(key)) && this.vars[key].reset()

    })
    
    this.triggerUpdate()
  }

  // public values(){
  //   const returnObj: {[key: string]: any} = {}
  //   Object.keys(this.vars).map(key => returnObj[key] = this.vars[key].value)
  //   return returnObj
  // }

  // subscription callback
  private triggerUpdate(){    
    const returnObj: {[key: string]: any} = {}
    Object.keys(this.vars).map(key => returnObj[key] = this.vars[key].value)
    Object.values(this.callbackStore).forEach(cb => {
      cb(returnObj)
    })
  }

  // subscription service
  public subscribe(cb: (vals: any) => void) {
    const uuid = uuidv4()
    this.callbackStore[uuid] = cb
    this.triggerUpdate()
    return () => {
      delete this.callbackStore[uuid]
    }
  }
}


export default QueryVars 
