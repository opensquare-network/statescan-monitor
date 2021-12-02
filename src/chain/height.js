const { getApi } = require("./api");


async function getFinalizedNumber() {
  const api = await getApi();
  const hash = await api.rpc.chain.getFinalizedHead();
  const head = await api.rpc.chain.getHeader(hash);

  return head.number.toNumber();
}


module.exports = {
  getFinalizedNumber,
};
