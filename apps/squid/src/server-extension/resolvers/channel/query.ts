import { oldFormatAdaptor as channels } from './data'
import { Chain, Result, Token } from './types'

type Props = {
  source: string | null
  destination: string | null
  token: string | null
}

type ResultObject<T> = {
  [id: string]: T
}

// filter all channels by user input
export const query = ({ source, destination, token }: Props): Result => {
  source = !source ? null : source
  destination = !destination ? null : destination
  token = !token ? null : token

  // filter channels by those with the correct token, if set
  let filteredByToken = token
    ? channels.filter((channel) => channel.tokens.filter((channelToken) => channelToken.id === token).length)
    : channels

  // remove all tokens we're not concerned about, if there's a token set
  if (token) {
    filteredByToken = filteredByToken.map((channel) => {
      const tokens = channel.tokens.filter((channelToken) => channelToken.id === token)

      return {
        ...channel,
        tokens,
      }
    })
  }

  // filter by source chain, if set
  const filteredBySource = source
    ? filteredByToken.filter((channel) => channel?.source?.id === source)
    : filteredByToken

  // filter by destination chain, if set
  const filteredByDestination = destination
    ? filteredBySource.filter((channel) => channel?.destination?.id === destination)
    : filteredBySource

  // // filter by token, if set
  // const filteredByToken = !!token
  //   ? filteredByDestination.filter(channel => {
  //     return channel.tokens.filter(channelToken => channelToken.id === token).length
  //   })
  //   : filteredByDestination

  // if all 3 props are set and there's ambiguity in the filtered channels,
  // meaning there was more than one channel found, we should error as
  // there can only be one channel available if all 3 params are set
  if (!!source && !!destination && !!token && filteredByDestination.length > 1) {
    throw new Error('More than one channel found')
  }

  // fetch all available options
  const allSources: ResultObject<Chain> = {}
  const allDestinations: ResultObject<Chain> = {}
  const allTokens: ResultObject<Token> = {}
  channels.forEach((channel) => {
    allSources[channel.source.id] = channel.source
    allDestinations[channel.destination.id] = channel.destination
    channel.tokens.forEach((token: Token) => {
      allTokens[token.id] = token
    })
  })

  // fetch all filtered options
  const filteredSources: ResultObject<Chain> = {}
  const filteredDestinations: ResultObject<Chain> = {}
  const filteredTokens: ResultObject<Token> = {}
  filteredByDestination.forEach((channel) => {
    filteredSources[channel.source.id] = channel.source
    filteredDestinations[channel.destination.id] = channel.destination
    channel.tokens.forEach((_token: Token) => {
      if (token) {
        if (_token.id === token) {
          filteredTokens[_token.id] = _token
        }
      } else {
        filteredTokens[_token.id] = _token
      }
    })
  })

  // return the result type
  return {
    filtered: {
      channels: filteredByDestination,
      sources: Object.values(filteredSources),
      destinations: Object.values(filteredDestinations),
      tokens: Object.values(filteredTokens),
    },
    all: {
      channels: channels,
      sources: Object.values(allSources),
      destinations: Object.values(allDestinations),
      tokens: Object.values(allTokens),
    },
    query: {
      source,
      destination,
      token,
    },
  }
}
