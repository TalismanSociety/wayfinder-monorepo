import { ApolloClient, DefaultOptions, InMemoryCache, gql } from '@apollo/client'
import { DocumentNode } from '@apollo/client'
import { QueryParams, QueryResultType, WayfinderRouterProps } from '@talismn/wayfinder-types'

import { defaultQuery, defaultQueryResult } from './config'

export const _defaultQuery = gql`
  query GetChannels {
    result {
      all {
        channels {
          id
        }
      }
      query {
        source
        destination
        token
      }
    }
  }
`

const defaultApolloClientOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

class Router {
  uri?: string = undefined
  query: any = defaultQuery
  client = new ApolloClient({ cache: new InMemoryCache() })

  configure({ uri }: WayfinderRouterProps) {
    this.uri = uri

    this.client = new ApolloClient({
      uri: this.uri,
      cache: new InMemoryCache({
        addTypename: false,
      }),
      defaultOptions: defaultApolloClientOptions,
      assumeImmutableResults: true,
    })
  }

  async fetchChannels(params: QueryParams) {
    const result = await this.client.query({ query: this.query, variables: { ...params } })

    return {
      ...(result?.data?.result || defaultQueryResult),
    } as QueryResultType
  }
}

const router = new Router()

export default router
