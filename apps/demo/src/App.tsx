import useWayfinder from '@talismn/wayfinder-react-hook'
import { Chain, WayfinderHookResult, WayfinderConfigProps } from '@talismn/wayfinder-types'
import { useEffect } from 'react'
import { availableAccounts, availableAssets } from './config'

const wayfinderProps: WayfinderConfigProps = {
  uri: 'http://localhost:4350/graphql'
}

const App = () => {

  const {
    all,
    filtered,
    inputParams,
    status,
    set,
    clear
  } : WayfinderHookResult = useWayfinder(wayfinderProps)

  // set this when the accounts have loaded
  //  - in reality this will be queries from somewhere 
  useEffect(() => {
    set('account', availableAccounts[0].address)
  }, [])

  // fetch the available assets when the account changes
  //  - we can probably migrate this to a hook, which wraps useWayfinder with the ability to 
  //  - lookup assets when the account changes
  useEffect(() => {
    if(!inputParams.account) return
    set('availableAssets', availableAssets[inputParams.account])
  }, [inputParams.account])

  console.log()


  return <div style={{display: 'flex'}}>
    
    <div style={{padding: '2em', width: '20%'}}>
      <h1>User Accounts</h1>
      
      {(availableAccounts).map(({name, address}) => {
        return <div>
          <h3 key={address} style={{marginBottom: '0.4em'}}>{name} | {address}</h3>
          {(availableAssets[address]).map(({chain, token, amount}) => <div key={`${chain}${token}`}>{chain} | {token} | {amount}</div> )}
        </div>
      } )}

      <sub style={{opacity: 0.5}}>key: [chain | token | amount]</sub>
    </div>

    <div style={{padding: '2em', width: '20%'}}>
      <h1>User Input:</h1>
      <form onSubmit={() => console.log(434343)}>
        <fieldset>
          <legend>From Account:</legend>
          <select 
            style={{width: '100%'}} 
            value={inputParams.account} 
            onChange={e => set('account', e.target.value)}
            >
            {(availableAccounts).map(({name, address}) => <option key={address} value={address}>{name}</option>)}
          </select>
        </fieldset>

        <fieldset>
          <legend>Source Chain:</legend>
          <select 
            style={{width: '100%'}} 
            disabled={!!inputParams?.source}  
            value={inputParams?.source || '-1'} 
            onChange={e => set('source', e.target.value === '-1' ? undefined : e.target.value)}
            >
            <option value={'-1'}>Select</option>
            <optgroup label="Available">
              {(filtered?.sources||[]).map(({id, name}: Chain) => <option key={id} value={id}>{name}</option>)}
            </optgroup>
            <optgroup label="Unavailable">
              {(all?.sources||[]).map(({id, name}: Chain) => !filtered?.sources?.map(({id}) => id)?.includes(id) && <option key={id} value={id} disabled={true}>{name}</option>)}
            </optgroup>
          </select>
        </fieldset>

        <fieldset>
          <legend>Destination Chain:</legend>
          <select 
            style={{width: '100%'}} 
            disabled={!!inputParams?.destination} 
            value={inputParams?.destination || '-1'} 
            onChange={e => set('destination', e.target.value === '-1' ? undefined : e.target.value)}
            >
            <option value={'-1'}>Select</option>
            <optgroup label="Available">
              {(filtered?.destinations||[]).map(({id, name}: Chain) => <option key={id} value={id}>{name}</option>)}
            </optgroup>
            <optgroup label="Unavailable">
              {(all?.destinations||[]).map(({id, name}: Chain) => !filtered?.destinations?.map(({id}) => id)?.includes(id) && <option key={id} value={id} disabled={true}>{name}</option>)}
            </optgroup>
          </select>
        </fieldset>

        <fieldset>
          <legend>Destination Token:</legend>
          <select 
            style={{width: '100%'}} 
            disabled={!!inputParams?.token} 
            value={inputParams?.token || '-1'} 
            onChange={e => set('token', e.target.value === '-1' ? undefined : e.target.value)}
            >
            <option value={'-1'}>Select</option>
            <optgroup label="Available">
              {(filtered?.tokens||[]).map(({id, name}: Chain) => <option key={id} value={id}>{name}</option>)}
            </optgroup>
            <optgroup label="Unavailable">
              {(all?.tokens||[]).map(({id, name}: Chain) => !filtered?.tokens?.map(({id}) => id)?.includes(id)&& <option key={id} value={id} disabled={true}>{name}</option>)}
            </optgroup>
          </select>
        </fieldset>

        <fieldset>
          <legend>Amount:</legend>
          <input 
            style={{width: '100%'}} 
            type="number" 
            min='0' 
            max='10000000' 
            value={inputParams?.amount || 0} 
            onChange={e => set('amount', e.target.value)}/> 
        </fieldset>
       
        <button type='submit'>Submit</button>
        <button type='reset' onClick={() => clear()}>Reset</button>
      </form>
    </div>

    <div style={{padding: '2em', width: '20%'}}>
      <h1>Selected Inputs</h1>
      <h3>Account</h3>
      <div>Address: {inputParams.account}</div>
      <div>Assets: {inputParams.availableAssets.map(asset => `${asset.token}:${asset.amount}`).join(' ')}</div>
      <h3>Input Params</h3>
      <div>Source: {inputParams.source}</div>
      <div>Destination: {inputParams.destination}</div>
      <div>Token: {inputParams.token}</div>
      <div>Amount: {inputParams.amount}</div>
    </div>

    <div style={{padding: '2em', width: '20%'}}>
      <h1>Routes</h1>
      <h3>Filtered (by user assets/input)</h3>
      {(filtered?.channels||[]).map(({id, tokens}) => <div key={id}>{id} | {tokens.map(({name}) => name).join(', ')}</div> )}
      <h3>All</h3>
      {(all?.channels||[]).map(({id, tokens}) => <div key={id}>{id} | {tokens.map(({name}) => name).join(', ')}</div> )}
    </div>

    <div style={{padding: '2em', width: '20%'}}>
      <h1>Other:</h1>
      <div>Status: {status}</div>
      <div>Route: {status === 'ROUTE_FOUND' ? filtered?.channels[0]?.id : '-'}</div>
    </div>
  </div>
  
}

export default App;