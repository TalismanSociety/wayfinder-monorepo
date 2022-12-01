import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Chain {
  constructor(props?: Partial<Chain>) {
    Object.assign(this, props)
  }

  @Field(() => String)
  id!: string

  @Field(() => String)
  name!: string

  @Field(() => String)
  pallet!: string
}

@ObjectType()
export class Token {
  constructor(props?: Partial<Token>) {
    Object.assign(this, props)
  }

  @Field(() => String)
  id!: string

  @Field(() => String)
  name!: string

  @Field(() => String)
  symbol!: string
}

@ObjectType()
export class Channel {
  constructor(props?: Partial<Channel>) {
    Object.assign(this, props)
  }

  @Field(() => String)
  id!: string

  @Field(() => Chain)
  source!: Chain

  @Field(() => Chain)
  destination!: Chain

  @Field(() => [Token])
  tokens!: Token[]

  //@Field(() => [String])
  //fee!: string
}

@ObjectType()
export class ResultGroup {
  constructor(props?: Partial<ResultGroup>) {
    Object.assign(this, props)
  }

  @Field(() => [Channel])
  channels!: Channel[]

  @Field(() => [Chain])
  sources!: Chain[]

  @Field(() => [Chain])
  destinations!: Chain[]

  @Field(() => [Token])
  tokens!: Token[]
}

@ObjectType()
export class ResultQuery {
  constructor(props?: Partial<ResultQuery>) {
    Object.assign(this, props)
  }

  @Field(() => String, { nullable: true })
  source: string | null = null

  @Field(() => String, { nullable: true })
  destination: string | null = null

  @Field(() => String, { nullable: true })
  token: string | null = null
}

@ObjectType()
export class Result {
  constructor(props?: Partial<Result>) {
    Object.assign(this, props)
  }

  @Field(() => ResultGroup)
  filtered!: ResultGroup

  @Field(() => ResultGroup)
  all!: ResultGroup

  @Field(() => ResultQuery)
  query!: ResultQuery
}
