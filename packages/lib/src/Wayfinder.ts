import { 
  WayfinderSubscription,
  States,
  QueryResultType,
  WayfinderConfigProps,
  WayfinderInputVars,
  GenericObject,
  WayfinderSubscriptionResult
} from '@talismn/wayfinder-types'
import { 
  defaultQueryResult,
  defaultInputVars, 
  defaultInternalVars, 
  statusMessages, 
  defaultConfig 
} from './config'
import router from './Router'
import InputVars from './InputVars';
import SubscriptionService from './SubscriptionService'
import ChangeMon from './ChangeMon'
import { filterChannelDataByAssets } from './util'



// init a new change monitor
const changeMon = new ChangeMon()

 // init a subscription service
const subscriptionService = new SubscriptionService<WayfinderSubscriptionResult>()

// init a new state for input vars
const inputVars = new InputVars(defaultInputVars)

// init a new state for internal vars
// can probably be merged
// and then can subscribe to certain values rather than all at once
const internalVars = new InputVars(defaultInternalVars)


class WayFinder{

  // wayfinder props
  private config: WayfinderConfigProps = defaultConfig


  // bridges available based on source chain, dest chain and token
  // this has not been filtered by what the user has available
  private channelData: QueryResultType = {...defaultQueryResult}


  // init the wayfinder lib
  constructor(){
    // set up a input vars watcher
    inputVars.subscribe(params => this.handleUpdate(params))

    // set up a internal vars watcher
    internalVars.subscribe(() => this.fireSubscriptions())    

    // trigger a reset
    this.reset()
  }


  // allow the user to set some internal values
  public configure(options: WayfinderConfigProps){
    // merge the new options with the old ones
    this.config = {
      ...this.config,
      ...options
    }

    // configure the router
    router.configure({uri: this.config.uri})
    
  }


  // reset the wayfinder back to its original state
  reset(props?: {clearAvailableAssets?: boolean, cb: () => void}){
    // reset user input assets if requested
    if(props?.clearAvailableAssets === true) internalVars.set('availableAssets', null)

    // todo
    this.channelData = {...defaultQueryResult}

    // reset all the user input options
    inputVars.reset(['source', 'destination', 'token', 'amount'])

    // reset all internal vars
    internalVars.reset()

    // fire the callback if we have one
    if(!!props?.cb) props.cb()
  }

  // define the status   
  private updateStatus() {

    internalVars.set('statusMessage', null, true)
    internalVars.set('warning', null, true)

    // check if we have routes available
    if(this.channelData.filtered.channels.length <= 0){
      internalVars.set('status', 'ROUTE_NOT_FOUND')
      return
    }

    // determine if user inputs are still required
    if(
      !this.channelData.query.source ||
      !this.channelData.query.destination ||
      !this.channelData.query.token
    ){
      // fire this once on init to be sure, to be sure
      if(internalVars.get('status') === 'INITIALISED'){
        this.fireSubscriptions()
      }
      
      internalVars.set('status', 'INPUT_REQUIRED')
      return
    }

    // determine if we have a route
    if(
      !!this.channelData.query.source &&
      !!this.channelData.query.destination &&
      !!this.channelData.query.token &&
      this.channelData.filtered.channels.length === 1
    ){

      // if we have a route, and all values are set
      // lets figure out the user has enough funds
      const asset = inputVars.get('availableAssets').find(({chain, token}: any) => {
        return chain === inputVars.get('source') && token === inputVars.get('token')
      })

      // calculate gat, existentialDeposits, totals etc
      const gas = +this.config.handleRequestFee('test')
      const existentialDepositSource = 1
      const existentialDepositDestination = 1
      const amount = +inputVars.get('amount')
      const amountAndGas = amount + gas

      // TODO: use asert here to make it easier

      // AMOUNT CHECK: amount must be greater than 0
      if(amount <= 0){
        internalVars.set('status', 'INPUT_REQUIRED')
        return
      }

      // SOURCE REAP CHECK: check the amount being sent will reap the source account
      if(amountAndGas + existentialDepositSource > asset.amount){
        internalVars.set('status', 'INSUFFICIENT_FUNDS')
        internalVars.set('statusMessage', `Performing this action will reap your account.`)
        return
      }

      // DESTINATION REAP CHECK: check if amount being sent will reap the destinaion address
      // TODO: check the receiving chain for a balance and make a decision here
      if(amount < existentialDepositDestination){
        internalVars.set('status', 'INSUFFICIENT_FUNDS')
        internalVars.set('statusMessage', `${amount} is below the existential depost amount required on ${inputVars.get('destination')}.`)
        return
      }

      // made all the checks, looks like this will work
      // all the user to proceed
      internalVars.set('status', 'READY_TO_PROCESS')
      return
    }

    // update the status
    internalVars.set('status', 'INITIALISED')
  }
  

  // update the wayfinder state based on input values
  // this should only trigger when something changes
  private async handleUpdate(params: WayfinderInputVars){
    // get all vars
    const {
      account,
      source,
      destination,
      token,
      availableAssets
    } = params

    // refetch routes when needed
    if(
      // check these vals for change
      changeMon.hasChanged({
        source, 
        destination, 
        token, 
        account, 
        status: internalVars.get('status')
      }) || 
      // or, check we're in any of these statuses
      ['INITIALISED', 'NO_ROUTE_FOUND'].includes(internalVars.get('status'))
    ){
      try {
        internalVars.set('status', 'FETCHING_ROUTES')

        // fetch routes form routing service
        const channelData = await router.fetchChannels({source, destination, token})

        // hack to get around routes not returning anything
        if(!Object.keys(channelData).length) return

        // set the channelData
        this.channelData = channelData
      } catch (error) {
        internalVars.set('status', 'ERROR')
        internalVars.set('statusMessage', `Could not fetch route information.`)
        return
      }
    }

    // filter the channel data when availableAssets or filteredAssets changes
    if(changeMon.hasChanged({availableAssets, filteredAssets: this.channelData.filtered})) {
      this.channelData.filtered = filterChannelDataByAssets(this.channelData.filtered, availableAssets)
    }
    
    this.attemptAutoSelect()
 
    this.updateStatus()

    this.fireSubscriptions()
  }

  // attempt autoselect fields based on filtered route information
  // do not trigger callback after this
  // causing frontend issues, need to refactor slightly - disabled for now
  private attemptAutoSelect(){
    if(this.config?.autoSelectValues === true && false){
      if(!inputVars.get('source') && this.channelData.filtered.sources.length === 1){
        inputVars.set('source', this.channelData.filtered.sources[0].id, true) 
      }

      if(!inputVars.get('destination') && this.channelData.filtered.destinations.length === 1){
        inputVars.set('destination', this.channelData.filtered.destinations[0].id, true) 
      }

      if(!inputVars.get('token') && this.channelData.filtered.tokens.length === 1){
        inputVars.set('token', this.channelData.filtered.tokens[0].id, true) 
      }
    }
  }


  // setting the active item based on one selected
  // todo: type the val as a value in the current token|source|destination array
  public setFilter(key: string|GenericObject, value?: any){
    if(key === 'account' || Object.keys(key).includes('account')) this.reset()
    inputVars.set(key, value) 
  }

  
  // trigger all teh callbacks to be called after an update
  private fireSubscriptions(){

    const status = internalVars.get('status') as States

    const submitTransactionCb = () => {
      if(status === 'READY_TO_PROCESS'){
        console.log(1111)
        return true
      }else{
        console.log(2222)
        return false
      }
    }

    // define the data
    const cbData: WayfinderSubscriptionResult = {
      all: this.channelData.all,
      filtered: this.channelData.filtered,
      inputParams: inputVars.all() as WayfinderInputVars,
      status: status,
      statusMessage: internalVars.get('statusMessage') || statusMessages[status],
      submitTransaction: submitTransactionCb
    }

    subscriptionService.fire(cbData)
  }


  // subscribing to updates
  // return unsub callback to delete subscription
  public subscribe(cb: WayfinderSubscription) {
    const unsub = subscriptionService.subscribe(cb)
    this.fireSubscriptions()
    return unsub
  }
}

export default WayFinder
