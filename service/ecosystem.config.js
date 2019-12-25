module.exports = {
  apps: [
    {
      name: 'nest-api',
      script: 'dist/main.js',
      args: 'one two',
      instances: 1,
      autorestart: true,
      watch: ['dist/'],
      ignore_watch: ['node_modules'],
      watch_options: {
        usePolling: true,
      },
    },
  ],
};