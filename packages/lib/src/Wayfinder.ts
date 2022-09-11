import { v4 as uuidv4 } from 'uuid'; 
import { 
  AvailableAsset,
  QueryParams,
  WayfinderProps,
  WayfinderCallback,
  States,
  QueryResultType,
  WayfinderConfigProps
} from '@talismn/wayfinder-types'
import router from './Router'
import InputVars from './InputVars';
import { filterChannelDataByAssets } from './util'
import { DefaultInputVars, DefaultInternalVars } from './types'
import { defaultQueryResult } from './config'

// these are the inputs we collect from the user
const defaultInputVars: DefaultInputVars = {
  source: undefined,
  destination: undefined,
  token: undefined,
  amount: undefined,
}

const defaultInternalVars: DefaultInternalVars = {
  status: 'INITIALISED'
}

class WayFinder{
  
  // maintains input value state
  private inputVars = new InputVars(defaultInputVars)

  // internal vars
  private internalVars = new InputVars(defaultInternalVars)

  // bridges available based on source chain, dest chain and token
  // this has not been filtered by what the user has available
  private channelData: QueryResultType = {...defaultQueryResult}

  // a store of callbacks triggered when this instance updates
  private callbackStore: {[id: string]: WayfinderCallback} = {}
  
  // the user defined available assets
  private availableAssets: AvailableAsset[]|undefined = undefined
  
  // determines if the wayfinder auto selects values beased on available routes
  // if there's 1 options available for a certain input field, it will automatically be selected
  private autoSelectValues: Boolean = false


  // init the wayfinder lib
  constructor({uri}: WayfinderProps){
    // set up a input vars watcher
    this.inputVars.subscribe((params: DefaultInputVars) => this.handleUpdate(params))

    // set up a internal vars watcher
    this.internalVars.subscribe(() => this.fireSubscriptions())
    
    // configure the router
    router.configure({uri})

    // trigger a reset
    this.reset()
  }


  // allow the user to set some internal values
  public configure(props: WayfinderConfigProps){
    this.availableAssets = props.availableAssets
    this.autoSelectValues = props.autoSelectValues||false
  }


  // reset the wayfinder back to its original state
  reset({clearAvailableAssets = false }: {clearAvailableAssets?: boolean} = {}){
    // reset user input assets if requested
    if(clearAvailableAssets === true) this.internalVars.set('availableAssets', null)

    // todo
    this.channelData = {...defaultQueryResult}

    // reset all the user input options
    this.inputVars.reset(['source', 'destination', 'token'])

    // reset all internal vars
    this.internalVars.reset()
  }



  
  // fetch all the routes based on source chain, destination chain and token
  private async fetchRoutes(params: QueryParams) {
    // deconstruct the params
    const {
      source,
      destination,
      token,
    } = params

    // pluck out the vars we need in the query
    const queryVars = {source, destination, token}

    // run the query
    return await router.fetchChannels(queryVars)
  }

  
  private updateStatus() {

    // check if there are channels returned
    if(this.channelData.filtered.channels.length <= 0){
      this.internalVars.set('status', 'NO_ROUTES')
      return
    }

    // determine user inputs
    if(
      !this.channelData.query.source ||
      !this.channelData.query.destination ||
      !this.channelData.query.token
    ){
      if(this.internalVars.get('status') === 'INITIALISED'){
        this.fireSubscriptions()
      }
      
      this.internalVars.set('status', 'MISSING_INPUT')
      return
    }

    // determine if we have a route
    if(
      !!this.channelData.query.source &&
      !!this.channelData.query.destination &&
      !!this.channelData.query.token &&
      this.channelData.filtered.channels.length === 1
    ){
      this.internalVars.set('status', 'ROUTE_FOUND')
      return
    }

    // update the status
    this.internalVars.set('status', 'INITIALISED')
  }
  

  // update the wayfinder state based on input values
  // this should only trigger when something changes
  private async handleUpdate(params: DefaultInputVars){
    // get all vars
    const {
      source,
      destination,
      token,
      amount
    } = params
    
    // fetch routes
    const channelData = await this.fetchRoutes({source, destination, token})

    // hack to get around routes not returning anything
    if(!Object.keys(channelData).length) return

    // set the channelData
    this.channelData = channelData

    // set the filtered routes based on the user tokens
    this.channelData.filtered = filterChannelDataByAssets(this.channelData.filtered, this.availableAssets)
    
    // if there's only one available source, destination or token automatically set the values
    if(this.autoSelectValues === true){
      if(!this.inputVars.get('source') && this.channelData.filtered.sources.length === 1){
        this.inputVars.set('source', this.channelData.filtered.sources[0].id) 
      }

      if(!this.inputVars.get('destination') && this.channelData.filtered.destinations.length === 1){
        this.inputVars.set('destination', this.channelData.filtered.destinations[0].id) 
      }

      if(!this.inputVars.get('token') && this.channelData.filtered.tokens.length === 1){
        this.inputVars.set('token', this.channelData.filtered.tokens[0].id) 
      }
    }

    // update the status
    this.updateStatus()

    // trigger an update
    this.fireSubscriptions()
  }


  // setting the active item based on one selected
  // todo: type the val as a value in the current token|source|destination array
  public setFilter(key: string, val: string|undefined){
    this.inputVars.set(key, val)
  }

  
  // trigger all teh callbacks to be called after an update
  private fireSubscriptions(){    
    //if(this.internalVars.get('status') === 'INITIALISED') return
    Object.values(this.callbackStore).forEach(cb => {
      cb({
        ...this.channelData,
        status: this.internalVars.get('status') as States
      })
    })
  }


  // subscribing to updates
  // return unsub callback to delete subscription
  public subscribe(cb: WayfinderCallback) {
    const uuid = uuidv4()
    this.callbackStore[uuid] = cb
    this.fireSubscriptions()
    return () => {
      delete this.callbackStore[uuid]
    }
  }
}

export default WayFinder
