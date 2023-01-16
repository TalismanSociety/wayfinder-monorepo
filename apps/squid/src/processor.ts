import { Chain, ChainToken, Route, Token } from './model'
import { rawData } from './raw-data'
import { getRouteImplementation } from './route-implementations'
import { getStandaloneDbConnection } from './util/db'
import { parseRawData } from './util/parseRawData'

// notes for v2
// currently we're not doing any data ingestion for this squid
// in future versions we will ingest data from a source somewhere
// this may be via a simple github file somewhere, or it could be
// watching chainstate or governance for changes

// Ultimately we want to make this process automated and seamless
// so that it's always, to-the-block, sychronsied with the chains

// on start
;(async () => {
  // insert the latest config into the db
  await replaceDbWithRawData()

  // then check for routes which don't have a function to build their xcm txs
  await checkAllRoutesAreImplemented()
})()

async function replaceDbWithRawData() {
  const data = parseRawData(rawData)

  const entityManager = await getStandaloneDbConnection()

  // ditch existing data
  await entityManager.delete(Route, {})
  await entityManager.delete(ChainToken, {})
  await entityManager.delete(Token, {})
  await entityManager.delete(Chain, {})

  // insert new data
  await entityManager.save(data.chains)
  await entityManager.save(data.tokens)
  await entityManager.save(data.chainTokens)
  await entityManager.save(data.routes)
}

async function checkAllRoutesAreImplemented() {
  const entityManager = await getStandaloneDbConnection()
  const loadRelationIds = { disableMixedMap: true }
  const mapFromList = <T extends { id: string }>(list: T[]) => Object.fromEntries(list.map((item) => [item.id, item]))

  const routes = await entityManager.find(Route, { loadRelationIds })
  const chains = mapFromList(await entityManager.find(Chain, { loadRelationIds }))
  const tokens = mapFromList(await entityManager.find(Token, { loadRelationIds }))

  routes
    .map((route) => ({ from: chains[route.from.id], to: chains[route.to.id], token: tokens[route.token.id] }))
    .filter(({ from, to }) => !getRouteImplementation(from, to))
    .forEach(({ from, to, token }) =>
      console.error(`XCM route ${from.name} --${token.symbol}-> ${to.name} is not implemented`)
    )
}
