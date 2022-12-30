import { Field, ObjectType } from 'type-graphql'

import { Chain, Route, Token } from './DbModels'

@ObjectType()
export class FilterResult {
  constructor(props?: Partial<FilterResult>) {
    Object.assign(this, props)
  }

  @Field(() => [Route])
  routes!: Route[]

  @Field(() => [Chain])
  sources!: Chain[]

  @Field(() => [Chain])
  destinations!: Chain[]

  @Field(() => [Token])
  tokens!: Token[]
}
