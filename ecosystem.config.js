module.exports = {
  apps: [
    {
      name: 'dgstats',
      script: './server.js',
      watch: ['./'],
      env: {
        NODE_ENV: 'local',
        PORT: 6969
      },
      env_prod: {
        NODE_ENV: 'prod',
        PORT: 6969
      }
    }
  ]
};
