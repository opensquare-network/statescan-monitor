const dotenv = require("dotenv")
dotenv.config();

const { getScanFinalizedHeight } = require("./scan");
const { getFinalizedNumber } = require("./chain/height");
const { exec } = require("child_process");
const { disconnect } = require("./chain/api");

async function main() {
  const head = await getFinalizedNumber();
  const scanHeight = await getScanFinalizedHeight();

  if (head - scanHeight < 30) {
    console.log(`No problem, finalized height: ${ head }, scan height: ${ scanHeight }`)
    await disconnect();
    process.exit(0);
    return
  }

  const commands = process.env.COMMANDS;
  console.log(`Begin to execute commands ${ commands }`);
  exec(commands, (err, stdOut) => {
    console.log('stdOut', stdOut)
  })
}

main().catch(e => console.error(e))
