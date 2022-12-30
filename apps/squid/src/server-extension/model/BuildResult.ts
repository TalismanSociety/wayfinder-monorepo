import { Field, ObjectType } from 'type-graphql'

import { JsonScalar } from '../../util/JsonScalar'

@ObjectType()
export class BuildResult {
  constructor(props?: Partial<BuildResult>) {
    Object.assign(this, props)
  }

  @Field()
  module!: string

  @Field()
  method!: string

  @Field(() => JsonScalar)
  params!: unknown[]
}
