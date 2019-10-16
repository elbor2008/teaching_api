module.exports = {
  apps: [
    {
      name: 'handy admin api',
      script: './build/index.js',
      exp_backoff_restart_delay: 100,
      instances: 0,
      autorestart: true,
      watch: true,
      env: {
        PORT: 8000,
        NODE_ENV: 'production'
      }
    }
  ]
};
