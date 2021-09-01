const osu = require("node-os-utils")
const mem = osu.mem;
const { exec } = require("child_process");

async function lsa() {
  return new Promise(((resolve, reject) => {
    exec("ls -la", (err, stdout, stderr) => {
      if (err) {
        reject(err)
      } else if (stderr) {
        reject(stderr)
      } else if (stdout) {
        console.log(stdout)
        resolve(stdout)
      } else {
        reject()
      }
    })
  }))
}

async function restartMongod() {
  return new Promise((resolve, reject) => {
    exec("systemctl restart mongod", (err, stdout, stderr) => {
      if (err) {
        reject(err)
      } else if (stderr) {
        reject(stderr)
      } else if (stdout) {
        console.log(stdout)
        resolve(stdout)
      } else {
        reject()
      }
    })
  })
}

async function restartDockerContainers() {
  return new Promise((resolve, reject) => {
    exec("docker restart $(docker ps -q)", (err, stdout, stderr) => {
      if (err) {
        reject(err)
      } else if (stderr) {
        reject(stderr)
      } else if (stdout) {
        console.log(stdout)
        resolve(stdout)
      } else {
        reject()
      }
    })
  })
}

async function main() {
  const memInfo = await mem.info();
  if (memInfo.freeMemMb > 1000) {
    console.log(`Free memory: ${ memInfo.freeMemMb } Mb`)
    return
  }

  console.log(`Begin to restart mongod and docker containers`);
  await restartMongod();
  await restartDockerContainers();
}

main().catch(e => console.error(e))
