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
  await new Promise((resolve, reject) => {
    exec("systemctl restart mongod", (err, stdOut) => {
      if (err) {
        console.error("error restart mongod")
        reject()
        return
      }

      exec('docker restart $(docker ps -q)', (err, stdOut) => {
        resolve()
        console.log('stdOut', stdOut)
      })
    })
  })
}

main().catch(e => console.error(e))
