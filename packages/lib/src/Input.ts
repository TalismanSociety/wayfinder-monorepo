export default class Input<T>{
  
  public _initialValue?: T
  public _value?: T

  constructor(value?: T){
    this._initialValue = value
    this._value = value
  }

  set value(value: T|undefined){
    this._value = value
  }

  get value(): T|undefined {
    return this._value
  }

  reset(){
    this._value = this._initialValue
  }
}