import { Field, InputType } from 'type-graphql'

@InputType()
export class AssetInput {
  @Field()
  chainId!: string

  @Field()
  tokenId!: string
}
