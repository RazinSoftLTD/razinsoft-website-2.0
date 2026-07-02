module.exports = {
  apps: [
    {
      name: "my-nuxt-app",
      script: ".output/server/index.mjs",
      env: {
        PORT: 3010
      }
    }
  ]
}

// PORT=3010 pm2 start .output/server/index.mjs --name SignatureTuft