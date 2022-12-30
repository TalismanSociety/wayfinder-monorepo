import { graphql } from './graphql-codegen'

// TODO: Fill these out, then get the id for each token at runtime to fill out the config.ts file with account balances for each token
export const routesQuery = graphql(`
  query routes {
    filter {
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
        feeToken {
          id
        }
        fee
        weightLimit
      }
    }
  }
`)

export const sourcesQuery = graphql(`
  query sources {
    filter {
      sources {
        id
        paraId
        name
        logo
        prefix
        tokens {
          token {
            id
          }
          isNative
          existentialDeposit
          tokenIdent
        }
        routesFrom {
          id
        }
        routesTo {
          id
        }
      }
    }
  }
`)

export const destinationsQuery = graphql(`
  query destinations {
    filter {
      destinations {
        id
        paraId
        name
        logo
        prefix
        tokens {
          token {
            id
          }
          isNative
          existentialDeposit
          tokenIdent
        }
        routesFrom {
          id
        }
        routesTo {
          id
        }
      }
    }
  }
`)

export const tokensQuery = graphql(`
  query tokens {
    filter {
      tokens {
        id
        name
        symbol
        decimals
        chains {
          chain {
            id
          }
          isNative
          existentialDeposit
          tokenIdent
        }
        routes {
          id
        }
      }
    }
  }
`)

export const buildQuery = graphql(`
  query buildQuery($route: String!, $accountId: String!, $amount: String!) {
    build(route: $route, accountId: $accountId, amount: $amount) {
      module
      method
      params
    }
  }
`)

export const filterQuery = graphql(`
  query filterQuery($from: String, $to: String, $token: String, $assets: [AssetInput!]) {
    filter(from: $from, to: $to, token: $token, assets: $assets) {
      routes {
        id
      }
      sources {
        id
      }
      destinations {
        id
      }
      tokens {
        id
      }
    }
  }
`)
