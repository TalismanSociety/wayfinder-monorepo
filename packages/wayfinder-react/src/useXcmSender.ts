import { ApiPromise, WsProvider } from '@polkadot/api'
import { Signer } from '@polkadot/api/types'
import { formatDecimals, planckToTokens, tokensToPlanck } from '@talismn/util'
import { BigNumber } from 'bignumber.js'
import { request } from 'graphql-request'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { buildQuery } from './graphql'
import { useAllQuery } from './useWayfinder'
import type { XcmBalances } from './useXcmBalances'

type Status =
  | { INIT: true }
  | { LOADING: true }
  | { READY: true }
  | { ERROR: string }
  | { PROCESSING: true }
  | { SUBMITTING: string }
  | { TX_SUCCESS: { url: string } }
  | { TX_FAILED: { url: string } }

export const useXcmSender = (
  wayfinderSquid: string,
  balances: XcmBalances,
  sender?: { address: string; signer?: unknown },
  recipient?: string,
  route?: ReturnType<typeof useAllQuery>['routesMap']['string'],
  rpcs?: string | string[],
  amount?: string
) => {
  const { tokensMap } = useAllQuery(wayfinderSquid)

  const api = useApi(sender?.address !== undefined && recipient !== undefined && route !== undefined ? rpcs : undefined)
  const [status, setStatus] = useState<Status>({ INIT: true })

  const [balance, feeBalance] = useMemo((): [
    typeof balances[number] | undefined,
    typeof balances[number] | undefined
  ] => {
    if (!route) return [undefined, undefined]
    const allTokenBalances = balances
      .filter((balance) => balance.address === sender?.address)
      .filter((balance) => balance.chain.id === route.from.id)

    return [
      allTokenBalances.filter((balance) => balance.token.id === route.token.id).shift(),
      allTokenBalances.filter((balance) => balance.token.id === route.feeToken.id).shift(),
    ]
  }, [balances, route, sender])

  useEffect(() => {
    if (!sender) return setStatus({ INIT: true })
    if (!recipient) return setStatus({ INIT: true })
    if (!route) return setStatus({ INIT: true })
    if (amount === undefined) return setStatus({ INIT: true })
    if (!api) return setStatus({ LOADING: true })

    setStatus({ READY: true })
  }, [sender, recipient, route, amount, api])

  const send = useCallback(async () => {
    if (!sender) return setStatus({ ERROR: 'No sender' })
    if (!recipient) return setStatus({ ERROR: 'No recipient' })
    if (!route) return setStatus({ ERROR: 'No route' })
    if (amount === undefined) return setStatus({ ERROR: 'No amount' })
    if (!api) return setStatus({ ERROR: 'No api' })

    // TODO: [ ] Test for sufficient transfer token funds
    // TODO: [ ] Test for sufficient fee token funds
    // TODO: [x] Build & submit tx
    // TODO: [x] Watch tx

    const token = tokensMap[route.token.id]
    const feeToken = tokensMap[route.feeToken.id]

    const fromChainToken = token.chains.find(({ chain }) => chain.id === route.from.id)
    if (!fromChainToken) throw new Error(`Failed to find chain ${route.from.id} for token ${token.name}`)

    const toChainToken = token.chains.find(({ chain }) => chain.id === route.to.id)
    if (!toChainToken) throw new Error(`Failed to find chain ${route.to.id} for token ${token.name}`)

    const feeChainToken = feeToken.chains.find(({ chain }) => chain.id === route.from.id)
    if (!feeChainToken) throw new Error(`Failed to find chain ${route.from.id} for feeToken ${feeToken.name}`)

    // set status to processing, as we are just about to start doing some async work
    setStatus({ PROCESSING: true })

    let buildTx
    try {
      buildTx = (
        await request(wayfinderSquid, buildQuery, { route: route.id, sender: sender.address, recipient, amount })
      ).build
    } catch (error) {
      const message = ((error as any)?.response?.errors || []).map((error: any) => error.message).join(': ')
      return setStatus({ ERROR: `Failed to build XCM TX: ${message.length > 0 ? message : error}` })
    }

    const params = JSON.parse(buildTx.params)
    const tx = api.tx[buildTx.module][buildTx.method](...(Array.isArray(params) ? params : []))

    const feeEstimate = await tx.paymentInfo(sender.address, { signer: sender.signer as Signer })

    const feeFactor = 1.2 // used to approximate the max fee from the estimated fee
    const partialFee = feeEstimate.partialFee.toBigInt()
    const sendingFee = BigInt(BigNumber(partialFee.toString()).multipliedBy(feeFactor).integerValue().toString())
    const sendingEd = BigInt(fromChainToken.existentialDeposit)
    const feeEd = BigInt(feeChainToken.existentialDeposit)
    const receivingFee = BigInt(route.fee)
    const receivingEd = BigInt(toChainToken.existentialDeposit)

    // the minimum amount of tokens we can send, after taking into account:
    // the user's balance (on the receiving chain)
    // the receiving chain existentialDeposit
    // the receiving chain fee (if it's designated in the sending token)
    // TODO: Actually test the receiving chain balance and subtract it from the minimum
    const sendMinimum = receivingEd /* - (toBalance?.amount ?? 0) */ + (token.id === feeToken.id ? receivingFee : 0n)

    // the max amount of tokens we can send, after taking into account:
    // - the user's balance
    // - the sending chain fee
    // - the sending chain existentialDeposit
    const sendMaximum =
      token.id === feeToken.id
        ? BigInt(balance?.amount ?? 0) - sendingEd - sendingFee
        : BigInt(balance?.amount ?? 0) - sendingEd

    const canPaySendingFee = token.id === feeToken.id ? true : BigInt(feeBalance?.amount ?? 0) - feeEd - sendingFee > 0n

    console.info(
      JSON.stringify(
        {
          route,
          sender: sender.address,
          recipient,
          amount,
          sendMinimum: sendMinimum.toString(),
          sendMaximum: sendMaximum.toString(),
          canPaySendingFee,

          feeFactor: feeFactor.toString(),
          partialFee: partialFee.toString(),
          sendingFee: sendingFee.toString(),
          sendingEd: sendingEd.toString(),
          feeEd: feeEd.toString(),
          receivingFee: receivingFee.toString(),
          receivingEd: receivingEd.toString(),

          balance,
          feeBalance,
        },
        null,
        2
      )
    )

    if (BigInt(tokensToPlanck(amount, token.decimals)) < sendMinimum)
      return setStatus({
        ERROR: `Amount must be greater or equal to ${formatDecimals(
          planckToTokens(sendMinimum.toString(), token.decimals)
        )} ${token.symbol}`,
      })

    if (sendMaximum < BigInt(tokensToPlanck(amount, token.decimals)))
      return setStatus({
        ERROR: `Amount must be less than ${formatDecimals(planckToTokens(sendMaximum.toString(), token.decimals))} ${
          token.symbol
        }`,
      })

    if (!canPaySendingFee)
      return setStatus({ ERROR: `Insufficient ${feeToken.symbol} balance to pay sending chain fee` })

    setStatus({ SUBMITTING: 'Submitting TX' })

    try {
      const unsubscribe = await tx.signAndSend(
        sender.address,
        { signer: sender.signer as Signer },
        ({ status, events }) => {
          if (status.isBroadcast) return setStatus({ SUBMITTING: 'Broadcasting TX' })
          if (status.isInBlock) return setStatus({ SUBMITTING: 'Waiting for TX to be confirmed' })

          if (status.isFinalized) {
            unsubscribe()

            const success = events.find(({ event }) => event.method === 'ExtrinsicSuccess')
            const url = `https://app.talisman.xyz/history?address=${sender.address}`

            if (success) return setStatus({ TX_SUCCESS: { url } })
            return setStatus({ TX_FAILED: { url } })
          }
        }
      )
    } catch (error) {
      if (String(error) === 'Error: Cancelled') return setStatus({ ERROR: `TX cancelled` })
      return setStatus({ ERROR: `Unable to submit TX: ${error}` })
    }
  }, [wayfinderSquid, amount, api, balance, feeBalance, route, sender, recipient, tokensMap])

  return { status, send }
}

const useApi = (rpcs?: string | string[]) => {
  const [api, setApi] = useState<ApiPromise>()
  const refCount = useRef(0)

  useEffect(() => {
    if (!rpcs) return setApi(undefined)

    refCount.current = (refCount.current + 1) % Number.MAX_SAFE_INTEGER
    const count = refCount.current

    new ApiPromise({ provider: new WsProvider(rpcs) }).isReadyOrError.then((api) => {
      // ignore this api if we've started up a new one
      if (count !== refCount.current) return

      setApi(api)
    })
  }, [rpcs])

  return api
}
