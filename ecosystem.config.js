module.exports = {
  apps: [
    {
      name: "drive-on-server",
      script: "npm",
      args: "start",
      env: {
        PORT: "3000",
      },
    },
  ],

  deploy: {
    production: {
      user: "bitnami",
      host: "driveonserver",
      ref: "origin/main",
      repo: "https://github.com/kyleawayan/drive-on-server",
      path: "/home/bitnami/driveonserver",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
