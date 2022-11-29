import channels from './database/channels'
import { QueryParams } from './types'

const query = (params: QueryParams) => {
  let allChannels = channels

  // filter based on source chain, if set
  const filteredBySource = !!params.source
    ? Object.fromEntries(Object.entries(channels).filter(([key, { source }]) => source.id === params.source))
    : channels

  // filter based on destination chain, if set
  const filteredByDestination = !!params.destination
    ? Object.fromEntries(
        Object.entries(filteredBySource).filter(([key, { destination }]) => destination.id === params.destination)
      )
    : filteredBySource

  // filter based on token, if set
  const filteredByToken = !!params.token
    ? Object.fromEntries(
        Object.entries(filteredByDestination).filter(([key, { tokens }]) => {
          const tokenIds = tokens.map(({ id }) => id)
          return !!params.token ? tokenIds.includes(params.token) : false
        })
      )
    : filteredByDestination

  return filteredByDestination
}

export default query
