import useWayfinder from '@talismn/wayfinder-react-hook'
import { Chain, WayfinderHookResult } from '@talismn/wayfinder-types'
import { availableAssets } from './config'

const wayfinderProps = {
  availableAssets,
  autoSelectValues: true
}

const App = () => {

  const {
    all,
    filtered,
    query,
    status,
    set,
    clear
  } : WayfinderHookResult = useWayfinder(wayfinderProps)

  return <div style={{display: 'flex'}}>
    
    <div style={{padding: '2em'}}>
      <h1>User Assets</h1>
      {(availableAssets).map(({chain, token, amount}) => <div key={`${chain}${token}`}>{chain} | {token} | {amount}</div> )}
      <sub style={{opacity: 0.5}}>key: [chain | token | amount]</sub>
    </div>


    <div style={{padding: '2em'}}>
      <h1>User Input:</h1>
      <form>
        <fieldset>
          <legend>Source Chain:</legend>
          <select 
            style={{width: '100%'}} 
            disabled={!!query?.source}  
            value={query?.source || '-1'} 
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
            disabled={!!query?.destination} 
            value={query?.destination || '-1'} 
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
          <legend>Destination Chain:</legend>
          <select 
            style={{width: '100%'}} 
            disabled={!!query?.token} 
            value={query?.token || '-1'} 
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
          <input style={{width: '100%'}} type="number" min='0' max='100' value={query?.source || ''} onChange={e => set('amount', e.target.value)}/> 
        </fieldset>
       
        <button type='submit'>Submit</button>
        <button type='reset' onClick={() => clear()}>Reset</button>
      </form>
    </div>

    <div style={{padding: '2em'}}>
      <h1>Selected Inputs</h1>
      {Object.entries(query).map(([key, val]) => <div>{key}: {val}</div> )}
    </div>

    <div style={{padding: '2em'}}>
      <h1>Routes</h1>
      <h3>Filtered (by user assets/input)</h3>
      {(filtered?.channels||[]).map(({id, tokens}) => <div key={id}>{id} | {tokens.map(({name}) => name).join(', ')}</div> )}
      <h3>All</h3>
      {(all?.channels||[]).map(({id, tokens}) => <div key={id}>{id} | {tokens.map(({name}) => name).join(', ')}</div> )}
    </div>

    <div style={{padding: '2em'}}>
      <h1>Other:</h1>
      <div>Status: {status}</div>
      <div>Route: {status === 'ROUTE_FOUND' ? filtered?.channels[0]?.id : '-'}</div>
    </div>
  </div>
  
}

export default App;