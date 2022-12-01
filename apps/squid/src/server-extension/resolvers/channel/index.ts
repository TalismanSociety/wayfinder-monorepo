import { Arg, Query, Resolver } from 'type-graphql'
import type { EntityManager } from 'typeorm'

import { query as channelQuery } from './query'
import { Result } from './types'

@Resolver()
export class ChannelResolver {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Query(() => Result)
  async result(
    @Arg('source', { nullable: true }) source: string,
    @Arg('destination', { nullable: true }) destination: string,
    @Arg('token', { nullable: true }) token: string
  ): Promise<Result> {
    return channelQuery({ source, destination, token })
  }
}
