const fetch = require("cross-fetch")

async function getScanFinalizedHeight() {
  const apiUrl = process.env.API_URL;
  if (!apiUrl) {
    throw 'No API_URL config'
  }

  const response = await fetch(apiUrl + '/blocks?page_size=1');
  const blocks = await response.json();

  const items = blocks?.items || []
  const latestBlock = items[items.length - 1];
  if (!latestBlock) {
    throw 'Can not get latest block from api'
  }

  return latestBlock.header.number
}

module.exports = {
  getScanFinalizedHeight,
}
