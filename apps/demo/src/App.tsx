import { formatDecimals } from '@talismn/util'
import { Chain } from '@talismn/wayfinder-types'

import { availableAssets } from './config'
import { useXChainTransaction } from './useXChainTransaction'

export const App = () => {
  const { all, filtered, inputParams, status, statusMessage, set, clear, availableAccounts, submitTransaction } =
    useXChainTransaction()

  return (
    <div style={{ display: 'flex' }}>
      <style>{base}</style>
      <style>{darkTheme}</style>
      <div style={{ padding: '2em', width: '20%' }}>
        <h2>User Accounts</h2>

        <pre>
          {availableAccounts.map(({ name, address }) => {
            return (
              <p key={[name, address].join('-')}>
                <strong>
                  {name} ({address.substring(0, 4)}...{address.substring(address.length - 4)})
                </strong>
                <br />
                {availableAssets[address].map(({ chain, token, amount }) => (
                  <div key={`${chain}${token}`}>
                    {chain} &lt;- {formatDecimals(amount)} {token}
                  </div>
                ))}
              </p>
            )
          })}
        </pre>
      </div>

      <div style={{ padding: '2em', width: '20%' }}>
        <h2>User Input</h2>
        <form
          onSubmit={(e) => {
            e.stopPropagation()
            e.preventDefault()
            submitTransaction()
          }}
        >
          <fieldset>
            <legend>From Account</legend>
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

          <fieldset style={{ display: 'flex' }}>
            <legend>Source Chain</legend>
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
            <button onClick={(e) => set('source', undefined)}>x</button>
          </fieldset>

          <fieldset style={{ display: 'flex' }}>
            <legend>Destination Chain</legend>
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
            <button onClick={(e) => set('destination', undefined)}>x</button>
          </fieldset>

          <fieldset style={{ display: 'flex' }}>
            <legend>Destination Token</legend>
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
            <button onClick={(e) => set('token', undefined)}>x</button>
          </fieldset>

          <fieldset>
            <legend>Amount</legend>
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
        <h2>Selected Inputs</h2>

        <pre>
          <p>
            <strong>Account</strong>
            <br />
            {inputParams.account
              ? `${inputParams.account.substring(0, 4)}...${inputParams.account.substring(
                  inputParams.account.length - 4
                )}`
              : 'None'}
          </p>
          <p>
            <strong>Account Assets</strong>
            <br />
            {inputParams.availableAssets.map((asset) => `${asset.token}:${asset.amount}`).join(' ')}
          </p>
          <p>
            <strong>Source</strong>
            <br />
            {inputParams.source ?? 'None'}
          </p>
          <p>
            <strong>Destination</strong>
            <br />
            {inputParams.destination ?? 'None'}
          </p>
          <p>
            <strong>Token</strong>
            <br />
            {inputParams.token ?? 'None'}
          </p>
          <p>
            <strong>Amount</strong>
            <br />
            {inputParams.amount ?? 'None'}
          </p>
        </pre>
      </div>

      <div style={{ padding: '2em', width: '20%' }}>
        <h2>Routes</h2>
        <pre>
          <p>
            <strong>Filtered (by user assets/input)</strong>
          </p>
          {(filtered?.channels || []).map(({ id, source, destination, tokens }) => (
            <p key={id}>
              Route {id}
              <br />
              {tokens.map(({ name }) => `${source.name} --${name}-> ${destination.name}`).join('\n')}
            </p>
          ))}
          <p>
            <strong>All</strong>
          </p>
          {(all?.channels || []).map(({ id, source, destination, tokens }) => (
            <p key={id}>
              Route {id}
              <br />
              {tokens.map(({ name }) => `${source.name} --${name}-> ${destination.name}`).join('\n')}
            </p>
          ))}
        </pre>
      </div>

      <div style={{ padding: '2em', width: '20%' }}>
        <h2>Other</h2>
        <pre>
          <p>
            <strong>Status</strong>
            <br />
            {status}
          </p>
          <p>
            <strong>Status Message</strong>
            <br />
            {statusMessage}
          </p>
          <p>
            <strong>Route</strong>
            <br />
            {status === 'FETCHING_ROUTES' ? filtered?.channels[0]?.id : '-'}
          </p>
        </pre>
      </div>
    </div>
  )
}

const css = (raw: readonly string[] | ArrayLike<string>, ...substitutions: any[]): string =>
  String.raw({ raw }, ...substitutions)

const base = css`
  * {
    box-sizing: border-box;
  }
  html {
    font-size: 10px;
  }
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
      'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 1.4rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  code,
  pre {
    white-space: pre-wrap;
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    font-size: 1.2rem;
  }
  a {
    text-decoration: none;
  }
`

const darkTheme = css`
  @media (prefers-color-scheme: dark) {
    html {
      background: #efefef;
      filter: invert(1);
    }
  }
`
