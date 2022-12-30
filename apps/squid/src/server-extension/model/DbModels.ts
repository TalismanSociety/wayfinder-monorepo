import { Field, Int, ObjectType } from 'type-graphql'

import {
  Chain as ChainModel,
  ChainToken as ChainTokenModel,
  Route as RouteModel,
  Token as TokenModel,
} from '../../model'

@ObjectType()
export class Chain implements ChainModel {
  constructor(props?: Partial<Chain>) {
    Object.assign(this, props)
  }

  @Field()
  id!: string

  @Field(() => Int, { nullable: true })
  paraId!: number | undefined | null

  @Field()
  name!: string

  @Field()
  logo!: string

  @Field(() => Int)
  prefix!: number

  @Field(() => [ChainToken])
  tokens!: ChainToken[]

  @Field(() => [Route])
  routesFrom!: Route[]

  @Field(() => [Route])
  routesTo!: Route[]
}

@ObjectType()
export class Token implements TokenModel {
  constructor(props?: Partial<Token>) {
    Object.assign(this, props)
  }

  @Field()
  id!: string

  @Field()
  name!: string

  @Field()
  symbol!: string

  @Field(() => Int)
  decimals!: number

  @Field(() => [ChainToken])
  chains!: ChainToken[]

  @Field(() => [Route])
  routes!: Route[]
}

@ObjectType()
export class ChainToken implements ChainTokenModel {
  constructor(props?: Partial<ChainToken>) {
    Object.assign(this, props)
  }

  @Field()
  id!: string

  @Field(() => Chain)
  chain!: Chain

  @Field(() => Token)
  token!: Token

  @Field()
  isNative!: boolean

  @Field()
  existentialDeposit!: string

  @Field()
  tokenIdent!: string
}

@ObjectType()
export class Route implements RouteModel {
  constructor(props?: Partial<Route>) {
    Object.assign(this, props)
  }

  @Field()
  id!: string

  @Field(() => Chain)
  from!: Chain

  @Field(() => Chain)
  to!: Chain

  @Field(() => Token)
  token!: Token

  @Field(() => Token)
  feeToken!: Token

  @Field()
  fee!: string

  @Field()
  weightLimit!: string
}
