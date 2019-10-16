module.exports = {
  apps: [
    {
      name: 'teaching api',
      script: './build/index.js',
      exp_backoff_restart_delay: 100,
      instances: 0,
      autorestart: true
    }
  ]
};
