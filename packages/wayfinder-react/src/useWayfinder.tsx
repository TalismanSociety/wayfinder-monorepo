import { gql, request } from 'graphql-request'
import produce from 'immer'
import uniq from 'lodash/uniq'
import { Dispatch, ReactNode, useEffect, useMemo, useReducer } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import { destinationsQuery, routesQuery, sourcesQuery, tokensQuery } from './graphql'
import { Query, Route } from './graphql-codegen/graphql'

const queryClient = new QueryClient()

export const WayfinderProvider = ({ children }: { children?: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

export const useWayfinder = (wayfinderSquid: string) => {
  const { dispatch, from, to, amount, token, assets, sender, recipient, autofill } = useInputs()

  const all = useAllQuery(wayfinderSquid)
  const filteredQuery = useFilterQuery(wayfinderSquid, { from, to, token, assets })

  const filtered = useMemo(
    () => ({
      routes: (all.routes ? (filteredQuery.routes ?? []).map(({ id }) => all.routesMap[id]) : []).filter(isDefined),
      sources: (all.sources ? (filteredQuery.sources ?? []).map(({ id }) => all.sourcesMap[id]) : []).filter(isDefined),
      destinations: (all.destinations
        ? (filteredQuery.destinations ?? []).map(({ id }) => all.destinationsMap[id])
        : []
      ).filter(isDefined),
      tokens: (all.tokens ? (filteredQuery.tokens ?? []).map(({ id }) => all.tokensMap[id]) : []).filter(isDefined),
    }),
    [all, filteredQuery]
  )

  useAutofill(dispatch, { from, to, token, autofill }, filtered.routes)

  return {
    status: filteredQuery.status,
    inputs: { dispatch, from, to, amount, token, assets, sender, recipient },
    all,
    filtered,
  }
}

type InputState = {
  from?: string
  to?: string
  token?: string
  // used to filter routes based on chains+tokens for which the user has a balance
  assets?: Array<{ chainId: string; tokenId: string }>
  amount?: string
  sender?: string
  recipient?: string
  // used to trigger autofill after an input has been set to a defined value
  autofill?: boolean
}
type InputAction =
  | { reset: true }
  | { setFrom: string | undefined }
  | { setTo: string | undefined }
  | { setToken: string | undefined }
  | { setAssets: Array<{ chainId: string; tokenId: string }> | undefined }
  | { setAmount: string | undefined }
  | { setSender: string | undefined }
  | { setRecipient: string | undefined }

const useInputs = () => {
  const [inputState, dispatch] = useReducer((state: InputState, action: InputAction): InputState => {
    if ('reset' in action) return {}

    if (
      'setFrom' in action ||
      'setTo' in action ||
      'setToken' in action ||
      'setAssets' in action ||
      'setAmount' in action
    ) {
      return produce(state, (draft) => {
        draft.autofill = false

        if ('setFrom' in action) {
          draft.from = action.setFrom
          draft.autofill = draft.autofill || action.setFrom !== undefined
        }

        if ('setTo' in action) {
          draft.to = action.setTo
          draft.autofill = draft.autofill || action.setTo !== undefined
        }

        if ('setToken' in action) {
          draft.token = action.setToken
          draft.autofill = draft.autofill || action.setToken !== undefined
        }

        if ('setAssets' in action) {
          draft.assets = action.setAssets
        }

        if ('setAmount' in action) {
          draft.amount = action.setAmount
        }

        return draft
      })
    }

    // setSender resets other input vars
    if ('setSender' in action) return { sender: action.setSender, recipient: action.setSender }

    // setRecipient resets other input vars
    if ('setRecipient' in action) return { sender: action.setRecipient, recipient: action.setRecipient }

    const exhaustiveCheck: never = action
    throw new Error(`Unhandled action type ${exhaustiveCheck}`)
  }, {})

  return useMemo(() => ({ ...inputState, dispatch }), [inputState])
}

export const useAllQuery = (wayfinderSquid: string) => {
  const { routes, routesMap } = useRoutes(wayfinderSquid)
  const { sources, sourcesMap } = useSources(wayfinderSquid)
  const { destinations, destinationsMap } = useDestinations(wayfinderSquid)
  const { tokens, tokensMap } = useTokens(wayfinderSquid)

  return useMemo(
    () => ({ routes, routesMap, sources, sourcesMap, destinations, destinationsMap, tokens, tokensMap }),
    [routes, routesMap, sources, sourcesMap, destinations, destinationsMap, tokens, tokensMap]
  )
}

export const useFilterQuery = (
  wayfinderSquid: string,
  {
    from,
    to,
    token,
    assets,
  }: {
    from?: string
    to?: string
    token?: string
    assets?: Array<{ chainId: string; tokenId: string }>
  }
) => {
  const query = useQuery<Pick<Query, 'chains' | 'tokens' | 'routes'>>(
    ['all-routes'],
    async () =>
      await request(
        wayfinderSquid,
        gql`
          query {
            chains {
              id
            }
            tokens {
              id
            }
            routes {
              id
              from {
                id
              }
              to {
                id
              }
              token {
                id
              }
            }
          }
        `
      ),
    { staleTime: Infinity, cacheTime: Infinity }
  )

  return useMemo(() => {
    // organise the things which we'll later need to retrieve by id
    const allChainsMap = Object.fromEntries(query.data?.chains.map((chain) => [chain.id, chain]) ?? [])
    const allTokensMap = Object.fromEntries(query.data?.tokens.map((token) => [token.id, token]) ?? [])

    // create the route filters
    const allPass = () => true
    const fromFilter = from ? (route: Route) => route.from.id === from : allPass
    const toFilter = to ? (route: Route) => route.to.id === to : allPass
    const tokenFilter = token ? (route: Route) => route.token.id === token : allPass
    const assetsFilter = assets
      ? (route: Route) => assets.some(({ chainId, tokenId }) => chainId === route.from.id && tokenId === route.token.id)
      : allPass

    // filter the routes
    const routes = query.data?.routes.filter(fromFilter).filter(toFilter).filter(tokenFilter).filter(assetsFilter) ?? []

    // retrieve the filtered things based on the remaining routes
    const sources = uniq(routes.map(({ from }) => from.id)).map((id) => allChainsMap[id])
    const destinations = uniq(routes.map(({ to }) => to.id)).map((id) => allChainsMap[id])
    const tokens = uniq(routes.map(({ token }) => token.id)).map((id) => allTokensMap[id])

    // return the results
    return { routes, sources, destinations, tokens, status: query.status }
  }, [assets, from, query.data?.chains, query.data?.routes, query.data?.tokens, query.status, to, token])
}

const useMap = <T extends { id: string }>(list?: T[]): Record<string, T> =>
  useMemo(() => Object.fromEntries((list ?? []).map((item) => [item.id, item])), [list])

export const useRoutes = (wayfinderSquid: string) => {
  const { data, status } = useQuery('routes', async () => await request(wayfinderSquid, routesQuery))
  const routes = useMemo(() => data?.filter.routes, [data])
  const routesMap = useMap(routes)
  return useMemo(() => ({ status: status, routes, routesMap }), [status, routes, routesMap])
}

export const useSources = (wayfinderSquid: string) => {
  const { data, status } = useQuery('sources', async () => await request(wayfinderSquid, sourcesQuery))
  const sources = useMemo(() => data?.filter.sources, [data])
  const sourcesMap = useMap(sources)
  return useMemo(() => ({ status: status, sources, sourcesMap }), [status, sources, sourcesMap])
}

export const useDestinations = (wayfinderSquid: string) => {
  const { data, status } = useQuery('destinations', async () => await request(wayfinderSquid, destinationsQuery))
  const destinations = useMemo(() => data?.filter.destinations, [data])
  const destinationsMap = useMap(destinations)
  return useMemo(() => ({ status: status, destinations, destinationsMap }), [status, destinations, destinationsMap])
}

export const useTokens = (wayfinderSquid: string) => {
  const { data, status } = useQuery('tokens', async () => await request(wayfinderSquid, tokensQuery))
  const tokens = useMemo(() => data?.filter.tokens, [data])
  const tokensMap = useMap(tokens)
  return useMemo(() => ({ status: status, tokens, tokensMap }), [status, tokens, tokensMap])
}

const useAutofill = (
  dispatch: Dispatch<InputAction>,
  inputs: { from?: string; to?: string; token?: string; autofill?: boolean },
  routes: ReturnType<typeof useRoutes>['routes']
) => {
  useEffect(() => {
    if (!inputs.autofill) return

    const remainingSources = uniq(routes?.map((route) => route.from.id))
    if (!inputs.from && remainingSources.length === 1) dispatch({ setFrom: remainingSources[0] })

    const remainingDestinations = uniq(routes?.map((route) => route.to.id))
    if (!inputs.to && remainingDestinations.length === 1) dispatch({ setTo: remainingDestinations[0] })

    const remainingTokens = uniq(routes?.map((route) => route.token.id))
    if (!inputs.token && remainingTokens.length === 1) dispatch({ setToken: remainingTokens[0] })
  }, [dispatch, routes, inputs.autofill, inputs.from, inputs.to, inputs.token])
}

const isDefined = <T,>(value: T | undefined): value is T => value !== undefined
