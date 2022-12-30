import {
  Chain as ChainModel,
  ChainToken as ChainTokenModel,
  Route as RouteModel,
  Token as TokenModel,
} from '../../model'
import { BuildResult } from '../../server-extension/model'
import { xcmPalletReserveTransferAssets } from './xcmPalletReserveTransferAssets'
import { xTokensTransfer } from './xTokensTransfer'

export type RouteImplementationProps = {
  route: RouteModel
  from: ChainModel
  to: ChainModel
  token: TokenModel
  feeToken: TokenModel
  fromChainToken: ChainTokenModel
  toChainToken: ChainTokenModel
  feeChainToken: ChainTokenModel
  accountId: `0x${string}`
  amount: string
}

export const getRouteImplementationKey = (from: ChainModel, to: ChainModel) => `${from.name}-${to.name}`
export const routeImplementations: Record<string, (props: RouteImplementationProps) => BuildResult> = {
  'Polkadot-Acala': xcmPalletReserveTransferAssets,
  'Acala-Polkadot': xTokensTransfer,
}
