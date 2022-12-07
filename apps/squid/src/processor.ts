import { Chain, ChainToken, Route, Token } from './model'
import { rawData } from './raw-data'
import { getStandaloneDbConnection } from './util/db'
import { parseRawData } from './util/parseRawData'

// notes for v2
// currently we're not doing any data ingestion for this squid
// in future versions we will ingest data from a source somewhere
// this may be via a simple github file somewhere, or it could be
// watching chainstate or governance for changes

// Ultimately we want to make this process automated and seamless
// so that it's always, to-the-block, sychronsied with the chains

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
replaceDbWithRawData()
