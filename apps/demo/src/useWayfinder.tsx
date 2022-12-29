import { request } from 'graphql-request'
import uniq from 'lodash/uniq'
import { Dispatch, ReactNode, useEffect, useMemo, useReducer } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import { WAYFINDER_DATASOURCE } from './constants'
import { destinationsQuery, filterQuery, routesQuery, sourcesQuery, tokensQuery } from './graphql'

const queryClient = new QueryClient()

export const WayfinderProvider = ({ children }: { children?: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

export const useWayfinder = () => {
  const { dispatch, from, to, amount, token, assets, sender, recipient, autofill } = useInputs()

  const all = useAllQuery()
  const filteredQuery = useFilterQuery({ from, to, token, assets })

  const filtered = {
    routes: all.routes ? (filteredQuery.routes ?? []).map(({ id }) => all.routesMap[id]) : [],
    sources: all.sources ? (filteredQuery.sources ?? []).map(({ id }) => all.sourcesMap[id]) : [],
    destinations: all.destinations ? (filteredQuery.destinations ?? []).map(({ id }) => all.destinationsMap[id]) : [],
    tokens: all.tokens ? (filteredQuery.tokens ?? []).map(({ id }) => all.tokensMap[id]) : [],
  }

  useAutofill(dispatch, { from, to, token, autofill }, filtered.routes)

  return {
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
    if ('setFrom' in action) return { ...state, from: action.setFrom, autofill: action.setFrom !== undefined }
    if ('setTo' in action) return { ...state, to: action.setTo, autofill: action.setTo !== undefined }
    if ('setToken' in action) return { ...state, token: action.setToken, autofill: action.setToken !== undefined }
    if ('setAssets' in action) return { ...state, assets: action.setAssets }
    if ('setAmount' in action) return { ...state, amount: action.setAmount }

    // setSender resets other input vars
    if ('setSender' in action) return { sender: action.setSender, recipient: action.setSender }

    // setRecipient resets other input vars
    if ('setRecipient' in action) return { sender: action.setRecipient, recipient: action.setRecipient }

    const exhaustiveCheck: never = action
    throw new Error(`Unhandled action type ${exhaustiveCheck}`)
  }, {})

  return { ...inputState, dispatch }
}

export const useAllQuery = () => {
  const { routes, routesMap } = useRoutes()
  const { sources, sourcesMap } = useSources()
  const { destinations, destinationsMap } = useDestinations()
  const { tokens, tokensMap } = useTokens()

  return { routes, routesMap, sources, sourcesMap, destinations, destinationsMap, tokens, tokensMap }
}

export const useFilterQuery = ({
  from,
  to,
  token,
  assets,
}: {
  from?: string
  to?: string
  token?: string
  assets?: Array<{ chainId: string; tokenId: string }>
}) => {
  const query = useQuery(
    ['filter', from, to, token, assets],
    async () => await request(WAYFINDER_DATASOURCE, filterQuery, { from, to, token, assets })
  )

  return {
    status: query.status,
    routes: query.data?.filter?.routes,
    sources: query.data?.filter?.sources,
    destinations: query.data?.filter?.destinations,
    tokens: query.data?.filter?.tokens,
  }
}

const useMap = <T extends { id: string }>(list?: T[]): Record<string, T> =>
  useMemo(() => Object.fromEntries((list ?? []).map((item) => [item.id, item])), [list])

export const useRoutes = () => {
  const query = useQuery('routes', async () => await request(WAYFINDER_DATASOURCE, routesQuery))
  const routes = query.data?.filter.routes
  return { status: query.status, routes, routesMap: useMap(routes) }
}

export const useSources = () => {
  const query = useQuery('sources', async () => await request(WAYFINDER_DATASOURCE, sourcesQuery))
  const sources = query.data?.filter.sources
  return { status: query.status, sources, sourcesMap: useMap(sources) }
}

export const useDestinations = () => {
  const query = useQuery('destinations', async () => await request(WAYFINDER_DATASOURCE, destinationsQuery))
  const destinations = query.data?.filter.destinations
  return { status: query.status, destinations, destinationsMap: useMap(destinations) }
}

export const useTokens = () => {
  const query = useQuery('tokens', async () => await request(WAYFINDER_DATASOURCE, tokensQuery))
  const tokens = query.data?.filter.tokens
  return { status: query.status, tokens, tokensMap: useMap(tokens) }
}

const useAutofill = (
  dispatch: Dispatch<InputAction>,
  inputs: { from?: string; to?: string; token?: string; autofill?: boolean },
  routes: ReturnType<typeof useRoutes>['routes']
) => {
  useEffect(() => {
    if (!inputs.autofill) return

    const remainingSources = uniq(routes?.map((route) => route.from.id))
    if (!inputs.from && remainingSources.length === 1) return dispatch({ setFrom: remainingSources[0] })

    const remainingDestinations = uniq(routes?.map((route) => route.to.id))
    if (!inputs.to && remainingDestinations.length === 1) return dispatch({ setTo: remainingDestinations[0] })

    const remainingTokens = uniq(routes?.map((route) => route.token.id))
    if (!inputs.token && remainingTokens.length === 1) return dispatch({ setToken: remainingTokens[0] })
  }, [dispatch, inputs.autofill, inputs.from, inputs.to, inputs.token, routes])
}
