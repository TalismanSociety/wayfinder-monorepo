import { Chain as ChainModel, ChainToken as ChainTokenModel, Route as RouteModel, Token as TokenModel } from '../model'
import { BuildResult } from '../server-extension/model'
import {
  buildAcalaOrKaruraTx,
  buildAstarOrShidenTx,
  buildBifrostTx,
  buildCentrifugeAltairTx,
  buildCrustShadowTx,
  buildDarwiniaCrabTx,
  buildHydradxBasiliskTx,
  buildIntegriteeTx,
  buildInterlayKintsugiTx,
  buildKicoTx,
  buildKylinPichiuTx,
  buildListenTx,
  buildMantaCalamariTx,
  buildOakTuringTx,
  buildParallelHeikoTx,
  buildPhalaKhalaTx,
  buildStatemintOrStatemineTx,
  buildUniqueQuartzTx,
} from './chain-specific'
import { xcmPalletLimitedReserveTransferAssets } from './xcmPalletLimitedReserveTransferAssets'
import { xcmPalletLimitedTeleportAssets } from './xcmPalletLimitedTeleportAssets'
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
  sender: string
  recipient: string
  amount: string
}

export const getRouteImplementation = (from: ChainModel, to: ChainModel) => {
  if (!routeImplementations[from.name]) return undefined
  return routeImplementations[from.name][to.name] ?? routeImplementations[from.name].default ?? undefined
}

/**
 * Format:
 *
 *     {
 *       [fromChain]: {
 *         [toChain]: implementationFunction,
 *         default: implementationFunction,
 *       }
 *     }
 */
export const routeImplementations: Record<
  string,
  Record<string | 'default', (props: RouteImplementationProps) => BuildResult>
> = {
  // NOTE: As we implement more routes, we're probably going to find that each implementation
  //       varies a huge amount based on the source chain.
  //       Ideally we can work towards having a small number of common implementations based on
  //       the source pallet, and use them for many different chains.
  //       But for now we'll likely need to have at least one separate implementation per chain.

  'Polkadot': {
    Statemint: xcmPalletLimitedTeleportAssets,
    Acala: xcmPalletReserveTransferAssets,
    default: xcmPalletLimitedReserveTransferAssets,
  },
  'Statemint': { default: buildStatemintOrStatemineTx },
  'Acala': {
    Polkadot: xTokensTransfer,
    default: buildAcalaOrKaruraTx,
  },
  'Astar': { default: buildAstarOrShidenTx },
  'Interlay': { default: buildInterlayKintsugiTx },
  // 'Moonbeam': { default: buildMoonbeamMoonriverTx },
  'Parallel': { default: buildParallelHeikoTx },

  'Kusama': {
    Statemine: xcmPalletLimitedTeleportAssets,
    Karura: xcmPalletReserveTransferAssets,
    default: xcmPalletLimitedReserveTransferAssets,
  },
  'Statemine': { default: buildStatemintOrStatemineTx },
  'Karura': { default: buildAcalaOrKaruraTx },
  'Bifrost': { default: buildBifrostTx },
  'Shiden': { default: buildAstarOrShidenTx },
  'Altair': { default: buildCentrifugeAltairTx },
  'Crust Shadow': { default: buildCrustShadowTx },
  'Darwinia Crab': { default: buildDarwiniaCrabTx },
  'Basilisk': { default: buildHydradxBasiliskTx },
  'Integritee': { default: buildIntegriteeTx },
  'Kintsugi': { default: buildInterlayKintsugiTx },
  'Kico': { default: buildKicoTx },
  'Pichiu': { default: buildKylinPichiuTx },
  'Listen': { default: buildListenTx },
  'Calamari': { default: buildMantaCalamariTx },
  // 'Moonriver': { default: buildMoonbeamMoonriverTx },
  'Turing': { default: buildOakTuringTx },
  'Parallel Heiko': { default: buildParallelHeikoTx },
  'Khala': { default: buildPhalaKhalaTx },
  'Quartz': { default: buildUniqueQuartzTx },
}
