const app = require('./app');
const config = require('./config/app.config');
const logger = require('./core/logger')(module);

let server = null;

server = app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});

// Graceful shutdown of nodeJs App.
process.on('SIGTERM', () => {
  logger.info('Graceful shutdown received');
  if (server) {
    server.close();
  }
});
