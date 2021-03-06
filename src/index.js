const dotenv = require("dotenv");
const pm2 = require("pm2");
dotenv.config();

const { getScanFinalizedHeight } = require("./scan");
const { getFinalizedNumber } = require("./chain/height");
const { disconnect } = require("./chain/api");
const { getCommands } = require("./env");
const { exec } = require("child_process");

async function main() {
  const head = await getFinalizedNumber();
  const scanHeight = await getScanFinalizedHeight();

  if (head - scanHeight < 30) {
    console.log(
      `No problem, finalized height: ${head}, scan height: ${scanHeight}`
    );
    await disconnect();
    process.exit(0);
    return;
  }

  const commands = getCommands();
  for (const command of commands) {
    exec(command, (err, stdOut) => {
      console.log('stdOut', stdOut)
    })
  }

  const names = (process.env.NAMES || "").split(";");
  console.log("Begin to restart pm2");
  pm2.connect((err) => {
    if (err) {
      console.log("pm2 connect error", err);
      process.exit(2);
    }

    pm2.list((err, list) => {
      (list || []).forEach((item) => {
        if (names.includes(item.name)) {
          pm2.restart(item.name, (err, proc) => {
            console.log(`pm2 restart ${item.name} error`, err);
          });
        }
      });
      pm2.disconnect();
    });
  });
}

main().catch((e) => console.error(e));
