import {
  GenericObject,
  QueryResultType,
  States,
  WayfinderConfigProps,
  WayfinderInputVars,
  WayfinderSubscription,
  WayfinderSubscriptionResult,
} from '@talismn/wayfinder-types'

import ChangeMon from './ChangeMon'
import { defaultConfig, defaultInputVars, defaultInternalVars, defaultQueryResult, statusMessages } from './config'
import { InputRequiredError, MultipleRouteFoundError, NoRouteFoundError } from './errors'
import InputVars from './InputVars'
import router from './Router'
import SubscriptionService from './SubscriptionService'
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

class WayFinder {
  // wayfinder props
  private config: WayfinderConfigProps = defaultConfig

  // bridges available based on source chain, dest chain and token
  // this has not been filtered by what the user has available
  private channelData: QueryResultType = { ...defaultQueryResult }

  // init the wayfinder lib
  constructor() {
    // set up a input vars watcher
    inputVars.subscribe((params) => this.handleUpdate(params))

    // set up a internal vars watcher
    internalVars.subscribe(() => this.fireSubscriptions())

    // trigger a reset
    this.reset()
  }

  // allow the user to set some internal values
  public configure(options: WayfinderConfigProps) {
    // merge the new options with the old ones
    this.config = {
      ...this.config,
      ...options,
    }

    // configure the router
    router.configure({ uri: this.config.uri })
  }

  // reset the wayfinder back to its original state
  reset(props?: { clearAvailableAssets?: boolean; cb: () => void }) {
    // reset user input assets if requested
    if (props?.clearAvailableAssets === true) internalVars.set('availableAssets', null)

    // todo
    this.channelData = { ...defaultQueryResult }

    // reset all the user input options
    inputVars.reset(['source', 'destination', 'token', 'amount'])

    // reset all internal vars
    internalVars.reset()

    // fire the callback if we have one
    if (props?.cb) props.cb()
  }

  // define the status
  private updateStatus() {
    // reset status
    //internalVars.set('statusMessage', null, true)
    //internalVars.set('warning', null, true)

    // get all input variables
    const inputAccount = inputVars.get('account')
    const inputSource = inputVars.get('source')
    const inputDestination = inputVars.get('destination')
    const inputToken = inputVars.get('token')

    // get fetched channel vars
    const channel = this.channelData.filtered.channels[0]
    const channelCount = this.channelData.filtered.channels.length

    // check all required input variables are set
    if (!inputAccount || !inputSource || !inputDestination || !inputToken) {
      // fire this once on init to be sure, to be sure
      if (internalVars.get('status') === 'INITIALISED') this.fireSubscriptions()

      // construct the missing variables array
      const missingInputValues = []
      if (!inputAccount) missingInputValues.push('Account')
      if (!inputSource) missingInputValues.push('Source chain')
      if (!inputDestination) missingInputValues.push('Destination chain')
      if (!inputToken) missingInputValues.push('Token')

      throw new InputRequiredError(missingInputValues)
    }

    // check if we have at least 1 channel
    if (channelCount < 1) throw new NoRouteFoundError()

    // check if we have at no more than 1 route
    if (channelCount > 1) throw new MultipleRouteFoundError(channelCount)

    /// TODOTODOTODOTODO
    // validate source and destination address formats
    if (!inputVars.get('account')) {
      throw new InputRequiredError(['account'])
    }

    // determine if we have all required variables set
    if (
      !!inputVars.get('source') && // source chain
      !!inputVars.get('destination') && // destination chain
      !!inputVars.get('token') && // token
      !!inputVars.get('amount') && // amount
      this.channelData.filtered.channels.length === 1
    ) {
      // yay, we have a route, and all values are set
      // lets figure out the user has enough funds

      // get the users asset on the source chain
      const sourceAasset = inputVars
        .get('availableAssets')
        .find(({ chain, token }: any) => chain === inputVars.get('source') && token === inputVars.get('token'))

      // get the users asset on the destination chain
      const destaintionAsset = inputVars
        .get('availableAssets')
        .find(({ chain, token }: any) => chain === inputVars.get('destiantion') && token === inputVars.get('token'))

      console.log(222, { sourceAasset, destaintionAsset })

      // calculate gat, existentialDeposits, totals etc
      const gas = +this.config.handleFetchChannelStats(inputVars.all())
      const existentialDepositSource = 1
      const existentialDepositDestination = 1
      const amount = +inputVars.get('amount')
      const amountAndGas = amount + gas
      const maxAmountAvailableToSend = amountAndGas + existentialDepositSource

      // TODO: use asert here to make it easier

      // AMOUNT CHECK: amount must be greater than 0
      if (!amount || amount <= 0) {
        internalVars.set('status', 'INPUT_REQUIRED')
        return
      }

      // SOURCE REAP CHECK: check the amount being sent will reap the source account
      if (maxAmountAvailableToSend > sourceAasset.amount) {
        internalVars.set('status', 'INSUFFICIENT_FUNDS')
        internalVars.set('statusMessage', `Performing this action will reap your account.`)
        return
      }

      // DESTINATION REAP CHECK: check if amount being sent will reap the destinaion address
      // TODO: check the receiving chain for a balance and make a decision here
      if (amount < existentialDepositDestination) {
        internalVars.set('status', 'INSUFFICIENT_FUNDS')
        internalVars.set(
          'statusMessage',
          `${amount} is below the existential depost amount required on ${inputVars.get('destination')}.`
        )
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
  private async handleUpdate(params: WayfinderInputVars) {
    // get all vars
    const { account, source, destination, token, availableAssets } = params

    try {
      // refetch routes when needed
      if (
        // check these vals for change
        changeMon.hasChanged({
          source,
          destination,
          token,
          account,
          status: internalVars.get('status'),
        }) ||
        // or, check we're in any of these statuses
        ['INITIALISED', 'NO_ROUTE_FOUND'].includes(internalVars.get('status'))
      ) {
        // set internal status
        internalVars.set('status', 'FETCHING_ROUTES')

        // fetch routes form routing service
        const channelData = await router.fetchChannels({ source, destination, token })

        // hack to get around routes not returning anything
        if (!Object.keys(channelData).length) return

        // set the channelData
        this.channelData = channelData
      }

      // filter the channel data when availableAssets or filteredAssets changes
      if (changeMon.hasChanged({ availableAssets, filteredAssets: this.channelData.filtered })) {
        this.channelData.filtered = filterChannelDataByAssets(this.channelData.filtered, availableAssets)
      }

      this.attemptAutoSelect()

      this.updateStatus()

      this.fireSubscriptions()
    } catch (error: any) {
      internalVars.set('status', error.status)
      internalVars.set('statusMessage', error.message)
    }
  }

  // attempt autoselect fields based on filtered route information
  // do not trigger callback after this
  // causing frontend issues, need to refactor slightly - disabled for now
  private attemptAutoSelect() {
    // if (this.config?.autoSelectValues === true) {
    //   if (!inputVars.get('source') && this.channelData.filtered.sources.length === 1) {
    //     inputVars.set('source', this.channelData.filtered.sources[0].id, true)
    //   }
    //
    //   if (!inputVars.get('destination') && this.channelData.filtered.destinations.length === 1) {
    //     inputVars.set('destination', this.channelData.filtered.destinations[0].id, true)
    //   }
    //
    //   if (!inputVars.get('token') && this.channelData.filtered.tokens.length === 1) {
    //     inputVars.set('token', this.channelData.filtered.tokens[0].id, true)
    //   }
    // }
  }

  // setting the active item based on one selected
  // todo: type the val as a value in the current token|source|destination array
  public setFilter(key: string | GenericObject, value?: any) {
    // reset all vars on account change
    if (key === 'account' || Object.keys(key).includes('account')) this.reset()

    // preformat the amount field to be a string
    if (key === 'amount' || Object.keys(key).includes('amount')) {
      if (key === 'amount') {
        value = parseFloat(value).toString()
      } else if (typeof key === 'object') {
        key.amount = parseFloat(value).toString()
      }
    }

    inputVars.set(key, value)
  }

  // trigger all teh callbacks to be called after an update
  private fireSubscriptions() {
    const status = internalVars.get('status') as States

    const submitTransactionCb = () => {
      if (status === 'READY_TO_PROCESS') {
        console.log(1111, inputVars.all())
        return true
      } else {
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
      submitTransaction: submitTransactionCb,
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
