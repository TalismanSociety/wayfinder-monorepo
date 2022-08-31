import { SubscriptionCallback, IUserAsset } from 'wayfinder-lib'

export type IProps = {
  assets?: IUserAsset[]
}

export type TReturn = SubscriptionCallback & {
  set(key: string, val: string|undefined): void
  clear(): void
}