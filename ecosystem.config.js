module.exports = {
  apps: [{
    name: 'statescan-memory-guard',
    script: "src/index.js",
    log_date_format: "YYYY-MM-DD HH:mm Z",
    cron_restart: "*/10 * * * *",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    },
    autorestart: false,
  }]
}
