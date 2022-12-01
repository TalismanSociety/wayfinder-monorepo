import { Chain } from '@talismn/wayfinder-types'

import { availableAssets } from './config'
import useXChainTransaction from './useXChainTransation'

export const App = () => {
  const { all, filtered, inputParams, status, statusMessage, set, clear, availableAccounts, submitTransaction } =
    useXChainTransaction()

  return (
    <div style={{ display: 'flex' }}>
      <style>{darkTheme}</style>
      <div style={{ padding: '2em', width: '20%' }}>
        <h1>User Accounts</h1>

        {availableAccounts.map(({ name, address }) => {
          return (
            <div key={[name, address].join('-')}>
              <h3 key={address} style={{ marginBottom: '0.4em' }}>
                {name} | {address}
              </h3>
              {availableAssets[address].map(({ chain, token, amount }) => (
                <div key={`${chain}${token}`}>
                  {chain} | {token} | {amount}
                </div>
              ))}
            </div>
          )
        })}

        <sub style={{ opacity: 0.5 }}>key: [chain | token | amount]</sub>
      </div>

      <div style={{ padding: '2em', width: '20%' }}>
        <h1>User Input:</h1>
        <form
          onSubmit={(e) => {
            e.stopPropagation()
            e.preventDefault()
            submitTransaction()
          }}
        >
          <fieldset>
            <legend>From Account:</legend>
            <select
              style={{ width: '100%' }}
              value={inputParams.account}
              onChange={(e) => set('account', e.target.value)}
            >
              {availableAccounts.map(({ name, address }) => (
                <option key={address} value={address}>
                  {name}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset>
            <legend>Source Chain:</legend>
            <select
              style={{ width: '100%' }}
              disabled={!!inputParams?.source}
              value={inputParams?.source || '-1'}
              onChange={(e) => set('source', e.target.value === '-1' ? undefined : e.target.value)}
            >
              <option value={'-1'}>Select</option>
              <optgroup label="Available">
                {(filtered?.sources || []).map(({ id, name }: Chain) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Unavailable">
                {(all?.sources || []).map(
                  ({ id, name }: Chain) =>
                    !filtered?.sources?.map(({ id }) => id)?.includes(id) && (
                      <option key={id} value={id} disabled={true}>
                        {name}
                      </option>
                    )
                )}
              </optgroup>
            </select>
          </fieldset>

          <fieldset>
            <legend>Destination Chain:</legend>
            <select
              style={{ width: '100%' }}
              disabled={!!inputParams?.destination}
              value={inputParams?.destination || '-1'}
              onChange={(e) => set('destination', e.target.value === '-1' ? undefined : e.target.value)}
            >
              <option value={'-1'}>Select</option>
              <optgroup label="Available">
                {(filtered?.destinations || []).map(({ id, name }: Chain) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Unavailable">
                {(all?.destinations || []).map(
                  ({ id, name }: Chain) =>
                    !filtered?.destinations?.map(({ id }) => id)?.includes(id) && (
                      <option key={id} value={id} disabled={true}>
                        {name}
                      </option>
                    )
                )}
              </optgroup>
            </select>
          </fieldset>

          <fieldset>
            <legend>Destination Token:</legend>
            <select
              style={{ width: '100%' }}
              disabled={!!inputParams?.token}
              value={inputParams?.token || '-1'}
              onChange={(e) => set('token', e.target.value === '-1' ? undefined : e.target.value)}
            >
              <option value={'-1'}>Select</option>
              <optgroup label="Available">
                {(filtered?.tokens || []).map(({ id, name }: Chain) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Unavailable">
                {(all?.tokens || []).map(
                  ({ id, name }: Chain) =>
                    !filtered?.tokens?.map(({ id }) => id)?.includes(id) && (
                      <option key={id} value={id} disabled={true}>
                        {name}
                      </option>
                    )
                )}
              </optgroup>
            </select>
          </fieldset>

          <fieldset>
            <legend>Amount:</legend>
            <input
              style={{ width: '100%' }}
              type="number"
              min="0"
              max="10000000"
              step="0.1"
              value={inputParams?.amount || 0}
              onChange={(e) => set('amount', e.target.value)}
            />
          </fieldset>

          <button type="submit" disabled={status !== 'READY_TO_PROCESS'}>
            Submit
          </button>
          <button type="reset" onClick={() => clear()}>
            Reset
          </button>
        </form>
      </div>

      <div style={{ padding: '2em', width: '20%' }}>
        <h1>Selected Inputs</h1>
        <h3>Account</h3>
        <div>Address: {inputParams.account}</div>
        <div>Assets: {inputParams.availableAssets.map((asset) => `${asset.token}:${asset.amount}`).join(' ')}</div>
        <h3>Input Params</h3>
        <div>Source: {inputParams.source}</div>
        <div>Destination: {inputParams.destination}</div>
        <div>Token: {inputParams.token}</div>
        <div>Amount: {inputParams.amount}</div>
      </div>

      <div style={{ padding: '2em', width: '20%' }}>
        <h1>Routes</h1>
        <h3>Filtered (by user assets/input)</h3>
        {(filtered?.channels || []).map(({ id, tokens }) => (
          <div key={id}>
            {id} | {tokens.map(({ name }) => name).join(', ')}
          </div>
        ))}
        <h3>All</h3>
        {(all?.channels || []).map(({ id, tokens }) => (
          <div key={id}>
            {id} | {tokens.map(({ name }) => name).join(', ')}
          </div>
        ))}
      </div>

      <div style={{ padding: '2em', width: '20%' }}>
        <h1>Other:</h1>
        <div>Status: {status}</div>
        <div>Status Message: {statusMessage}</div>
        <div>Route: {status === 'FETCHING_ROUTES' ? filtered?.channels[0]?.id : '-'}</div>
      </div>
    </div>
  )
}

const darkTheme = `
  @media (prefers-color-scheme: dark) {
    html {
      background: #efefef;
      filter: invert(1);
    }
  }
`
