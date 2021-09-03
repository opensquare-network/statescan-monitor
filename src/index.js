const osu = require("node-os-utils")
const mem = osu.mem;
const { exec } = require("child_process");

async function main() {
  const memInfo = await mem.info();
  if (memInfo.freeMemMb > 1000) {
    console.log(`Free memory: ${ memInfo.freeMemMb } Mb`)
    return
  }

  console.log(`Begin to restart mongod and docker containers`);
  exec("systemctl restart mongod", (err, stdOut) => {
    if (err) {
      console.error("error for ls")
      return
    }

    exec('docker restart $(docker ps -q)', (err, stdOut) => {
      console.log('stdOut', stdOut)
    })

  })
}

main().catch(e => console.error(e))
