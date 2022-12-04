import { States } from '@talismn/wayfinder-types'

export class WayfinderError extends Error {
  status: States = 'ERROR'
  message: string = 'An error has occurred'
  name: string = this.constructor.name
  isblocking: boolean = true
}

export class NoRouteFoundError extends WayfinderError {
  constructor() {
    super()
    this.status = 'ROUTE_NOT_FOUND'
    this.message = `some thing`
    this.isblocking = true
  }
}

export class MultipleRouteFoundError extends WayfinderError {
  constructor(count: number) {
    super()
    this.status = 'MULTIPLE_ROUTES_FOUND'
    this.message = `some thing`
    this.isblocking = true
  }
}

export class InputRequiredError extends WayfinderError {
  constructor(missingFields: string[]) {
    super()
    this.status = 'INPUT_REQUIRED'
    this.message = `The following fields are required: ${missingFields.join(', ')}`
    this.isblocking = true
  }
}
