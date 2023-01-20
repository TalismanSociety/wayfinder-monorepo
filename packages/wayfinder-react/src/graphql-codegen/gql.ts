import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/* eslint-disable */
import * as types from './graphql'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
  '\n  query routes {\n    filter {\n      routes {\n        id\n        from {\n          id\n        }\n        to {\n          id\n        }\n        token {\n          id\n        }\n        feeToken {\n          id\n        }\n        fee\n        weightLimit\n      }\n    }\n  }\n':
    types.RoutesDocument,
  '\n  query sources {\n    filter {\n      sources {\n        id\n        paraId\n        name\n        logo\n        prefix\n        rpcs\n        tokens {\n          token {\n            id\n          }\n          isNative\n          existentialDeposit\n          tokenIdent\n        }\n        routesFrom {\n          id\n        }\n        routesTo {\n          id\n        }\n      }\n    }\n  }\n':
    types.SourcesDocument,
  '\n  query destinations {\n    filter {\n      destinations {\n        id\n        paraId\n        name\n        logo\n        prefix\n        rpcs\n        tokens {\n          token {\n            id\n          }\n          isNative\n          existentialDeposit\n          tokenIdent\n        }\n        routesFrom {\n          id\n        }\n        routesTo {\n          id\n        }\n      }\n    }\n  }\n':
    types.DestinationsDocument,
  '\n  query tokens {\n    filter {\n      tokens {\n        id\n        name\n        logo\n        symbol\n        decimals\n        chains {\n          chain {\n            id\n          }\n          isNative\n          existentialDeposit\n          tokenIdent\n          chaindataId\n        }\n        routes {\n          id\n        }\n      }\n    }\n  }\n':
    types.TokensDocument,
  '\n  query buildQuery($route: String!, $sender: String!, $recipient: String!, $amount: String!) {\n    build(route: $route, sender: $sender, recipient: $recipient, amount: $amount) {\n      module\n      method\n      params\n    }\n  }\n':
    types.BuildQueryDocument,
  '\n  query filterQuery($from: String, $to: String, $token: String, $assets: [AssetInput!]) {\n    filter(from: $from, to: $to, token: $token, assets: $assets) {\n      routes {\n        id\n      }\n      sources {\n        id\n      }\n      destinations {\n        id\n      }\n      tokens {\n        id\n      }\n    }\n  }\n':
    types.FilterQueryDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query routes {\n    filter {\n      routes {\n        id\n        from {\n          id\n        }\n        to {\n          id\n        }\n        token {\n          id\n        }\n        feeToken {\n          id\n        }\n        fee\n        weightLimit\n      }\n    }\n  }\n'
): (typeof documents)['\n  query routes {\n    filter {\n      routes {\n        id\n        from {\n          id\n        }\n        to {\n          id\n        }\n        token {\n          id\n        }\n        feeToken {\n          id\n        }\n        fee\n        weightLimit\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query sources {\n    filter {\n      sources {\n        id\n        paraId\n        name\n        logo\n        prefix\n        rpcs\n        tokens {\n          token {\n            id\n          }\n          isNative\n          existentialDeposit\n          tokenIdent\n        }\n        routesFrom {\n          id\n        }\n        routesTo {\n          id\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query sources {\n    filter {\n      sources {\n        id\n        paraId\n        name\n        logo\n        prefix\n        rpcs\n        tokens {\n          token {\n            id\n          }\n          isNative\n          existentialDeposit\n          tokenIdent\n        }\n        routesFrom {\n          id\n        }\n        routesTo {\n          id\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query destinations {\n    filter {\n      destinations {\n        id\n        paraId\n        name\n        logo\n        prefix\n        rpcs\n        tokens {\n          token {\n            id\n          }\n          isNative\n          existentialDeposit\n          tokenIdent\n        }\n        routesFrom {\n          id\n        }\n        routesTo {\n          id\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query destinations {\n    filter {\n      destinations {\n        id\n        paraId\n        name\n        logo\n        prefix\n        rpcs\n        tokens {\n          token {\n            id\n          }\n          isNative\n          existentialDeposit\n          tokenIdent\n        }\n        routesFrom {\n          id\n        }\n        routesTo {\n          id\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query tokens {\n    filter {\n      tokens {\n        id\n        name\n        logo\n        symbol\n        decimals\n        chains {\n          chain {\n            id\n          }\n          isNative\n          existentialDeposit\n          tokenIdent\n          chaindataId\n        }\n        routes {\n          id\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query tokens {\n    filter {\n      tokens {\n        id\n        name\n        logo\n        symbol\n        decimals\n        chains {\n          chain {\n            id\n          }\n          isNative\n          existentialDeposit\n          tokenIdent\n          chaindataId\n        }\n        routes {\n          id\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query buildQuery($route: String!, $sender: String!, $recipient: String!, $amount: String!) {\n    build(route: $route, sender: $sender, recipient: $recipient, amount: $amount) {\n      module\n      method\n      params\n    }\n  }\n'
): (typeof documents)['\n  query buildQuery($route: String!, $sender: String!, $recipient: String!, $amount: String!) {\n    build(route: $route, sender: $sender, recipient: $recipient, amount: $amount) {\n      module\n      method\n      params\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query filterQuery($from: String, $to: String, $token: String, $assets: [AssetInput!]) {\n    filter(from: $from, to: $to, token: $token, assets: $assets) {\n      routes {\n        id\n      }\n      sources {\n        id\n      }\n      destinations {\n        id\n      }\n      tokens {\n        id\n      }\n    }\n  }\n'
): (typeof documents)['\n  query filterQuery($from: String, $to: String, $token: String, $assets: [AssetInput!]) {\n    filter(from: $from, to: $to, token: $token, assets: $assets) {\n      routes {\n        id\n      }\n      sources {\n        id\n      }\n      destinations {\n        id\n      }\n      tokens {\n        id\n      }\n    }\n  }\n']

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 **/
export function graphql(source: string): unknown

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<
  infer TType,
  any
>
  ? TType
  : never
