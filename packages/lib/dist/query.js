"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@apollo/client");
const CHAIN_FIELDS = (0, client_1.gql) `
  fragment ChainFields on Chain{
      id
      name
  }
`;
const TOKEN_FIELDS = (0, client_1.gql) `
  fragment TokenFields on Token{
      id
      name
      symbol
  }
`;
const CHILD_FRAGMENT = (0, client_1.gql) `
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
`;
exports.default = (0, client_1.gql) `
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
`;