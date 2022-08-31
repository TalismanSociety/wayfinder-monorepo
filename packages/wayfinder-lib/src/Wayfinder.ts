import { v4 as uuidv4 } from 'uuid';
import { Token, Chain, Channel, QueryParams, ChannelObject } from '../infra/types'
import { UpdateCb, AvailableAsset, States, SubscriptionCallback } from './types'
import Input from './Input'
import router from './Router'

export const initWayfinderState: SubscriptionCallback = {
  filters: {
    source: undefined,
    destination: undefined,
    token: undefined,
    amount: undefined,
  },
  channels: {
    all: {},
    sources: [],
    destinations: [],
    tokens: [],
  },
  status: 'INITIALISED'
}


class WayFinder{
  
  // list of all available assets, injected by the user
  // if set; filter all found channels based on user tokens
  // if undefined; don't filter found chanels based on user assets but instead return all channels found 
  private availableAssets?: AvailableAsset[]

  // the selected values the user has chosen 
  private selectedSource = new Input<string>()
  private selectedDestination = new Input<string>()
  private selectedToken = new Input<string>()
  private selectedAmount = new Input<string>()

  // bridges available based on source chain, dest chain and token
  // this has not been filtered by what the user has available
  private availableChannels: ChannelObject = router.fetchChannels({})

  // a store of callbacks triggered when this instance updates
  private callbackStore: {[id: string]: UpdateCb} = {}

  // status of the current wayfinder lookup
  private status: States = 'INITIALISED'
  private statusMessage?: string


  constructor(){
    this.reset()
  }  


  // sets all assets to filter routes by
  setAvailableAssets(assets: AvailableAsset[]){
    this.availableAssets = assets
    this.fetchRoutes()
  }

  // clears all assets
  clearAvailableAssets(){
    this.availableAssets = undefined
    this.fetchRoutes()
  }

  
  private fetchRoutes() {
    
    // we want to pass through the user defined fields
    // return all routes
    // union with setAvailableAssets - if set
    // fire callbacks with routes
    const filters: QueryParams = {}
    filters.source = this.selectedSource.value
    filters.destination = this.selectedDestination.value
    filters.token = this.selectedToken.value


    this.availableChannels = router.fetchChannels(filters)



    this.triggerUpdate()
  }


  // setting the active item based on one selected
  // todo: type the val as a value in the current token|source|destination array
  setFilter(key: string, val: string|undefined){
    switch (key) {
      case 'source': this.selectedSource.value = val; break;
      case 'destination': this.selectedDestination.value = val; break;
      case 'token': this.selectedToken.value = val; break;
      case 'amount': this.selectedAmount.value = val; break;
      default: break;
    }

    this.fetchRoutes()
  }

  reset({clearAvailableAssets = false }: {clearAvailableAssets?: boolean} = {}){

    // reset all the user input options
    this.selectedSource.reset()
    this.selectedDestination.reset()
    this.selectedToken.reset()
    this.selectedAmount.reset()

    // todo - reset all additional fields
    // if there are any, eg receiving address

    // reset user input assets if requested
    if(clearAvailableAssets === true) this.clearAvailableAssets()

    // todo
    this.availableChannels = {}
    this.status = "MISSING_INPUT"
    
    // refetch routes based on new state
    this.fetchRoutes()
  }

  triggerUpdate(){    
    // list all the unique source chains available in the current channels set
    const uniqueSources: {[key: string]: Chain} = {}
    Object.values(this.availableChannels).map(({source}: Channel) => {
      uniqueSources[source.id as string] = source
    })

    // list all the unique destinaion chains available in the current channels set
    const uniqueDestinations: {[key: string]: Chain} = {}
    Object.values(this.availableChannels).map(({destination}: Channel) => {
      uniqueDestinations[destination.id as string] = destination
    })

    // list all the unique tokens available in the current channels set
    const uniqueTokens: {[key: string]: Token} = {}
    Object.values(this.availableChannels).forEach(({tokens}: Channel) => {
      tokens.forEach(token => uniqueTokens[token.id as string] = token)
    })
    
    Object.values(this.callbackStore).forEach(cb => {
      cb({
        filters: {
          source: this.selectedSource.value,
          destination: this.selectedDestination.value,
          token: this.selectedToken.value,
          amount: this.selectedAmount.value
        },
        channels: {
          all: this.availableChannels,
          sources: Object.values(uniqueSources),
          destinations: Object.values(uniqueDestinations),
          tokens: Object.values(uniqueTokens)
        },
        status: this.status
      })
    })
  }


  // subscribing to updates
  // return unsub callback to delete subscription
  subscribe(cb: UpdateCb) {
    const uuid = uuidv4()
    this.callbackStore[uuid] = cb
    this.triggerUpdate()
    return () => {
      delete this.callbackStore[uuid]
    }
  }
    
}

export default WayFinder
