import useWayfinder, { Chain } from 'wayfinder-react-hook'

const App = () => {

  const {
    filters,
    channels,
    status,
    set,
    clear
  } = useWayfinder()

  return <div>
    <div>
      <h1>User Input:</h1>
      
      <select value={filters.source || '-1'} onChange={e => set('source', e.target.value === '-1' ? undefined : e.target.value)}>
        <option value={'-1'}>Select</option>
        {(channels.sources).map(({id, name}: Chain) => <option key={id} value={id}>{name}</option>)}
      </select>

      <select value={filters.destination || '-1'} onChange={e => set('destination', e.target.value === '-1' ? undefined : e.target.value)}>
        <option value={'-1'}>Select</option>
        {(channels.destinations).map(({id, name}: Chain) => <option key={id} value={id}>{name}</option>)}
      </select>

      <select value={filters.token || '-1'} onChange={e => set('token', e.target.value === '-1' ? undefined : e.target.value)}>
        <option value={'-1'}>Select</option>
        {(channels.tokens).map(({id, name}: Chain) => <option key={id} value={id}>{name}</option>)}
      </select>

      <input type="number" min='0' max='100' value={filters.amount || ''} onChange={e => set('amount', e.target.value)}/>
       
      <button onClick={() => clear()}>Clear</button>
    </div>
    <div>
      <h1>Selected Filters:</h1>
      {Object.keys(filters).map(key => <div key={key}>{key}: {filters[key as keyof typeof filters]}</div> )}
    </div>
    <div>
      <h1>Routes ({Object.values(channels.all).length}):</h1>
      {Object.keys(channels.all).map(key => <div key={key}>{key}</div> )}
    </div>
    <div>
      <h1>Other:</h1>
      <div>Status: {status}</div>
      <div>Route Found: {Object.values(channels.all).length === 1 ? Object.values(channels.all)[0].id : 'nope'}</div>
    </div>
  </div>
  
}

export default App;