import { gql } from '@apollo/client';
import { WayfinderCallbackResult, QueryResultType  } from '@talismn/wayfinder-types'

const CHAIN_FIELDS = gql`
  fragment ChainFields on Chain{
      id
      name
  }
`

const TOKEN_FIELDS = gql`
  fragment TokenFields on Token{
      id
      name
      symbol
  }
`

const CHILD_FRAGMENT = gql`
  ${CHAIN_FIELDS} 
  ${TOKEN_FIELDS}  
  fragment Pieces on ResultGroup{
    channels{
      id
      source {...ChainFields}
      destination { ...ChainFields }
      tokens { ...TokenFields }
    }
    sources { ...ChainFields}
    destinations { ...ChainFields }
    tokens {...TokenFields}
  }
`

export const defaultQuery = gql`
  ${CHILD_FRAGMENT}
  query GetChannels($source: String, $destination: String, $token: String){
    result(source: $source, destination: $destination, token: $token){
      all{ ...Pieces }
      filtered{ ...Pieces}
      query{
        source
        destination
        token
      }
    }
  }
`

export const defaultQueryResult: QueryResultType = {
  all: {
    channels: [],
    sources: [],
    destinations: [],
    tokens: []
  },
  filtered: {
    channels: [],
    sources: [],
    destinations: [],
    tokens: []
  },
  query: {
    source: null,
    destination: null,
    token: null
  }
}

export const defaultWayfinderCallbackResult: WayfinderCallbackResult = {
  ...defaultQueryResult,
  status: "INITIALISED"
}