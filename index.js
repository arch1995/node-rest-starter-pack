// used to replace relative import paths
// with absolute paths aliases defined in package.json.
// For more information - https://github.com/ilearnio/module-alias
require('module-alias/register');

const app = require('@app');
const config = require('@config/app.config');
const logger = require('@core/logger')('server');
const MongoConnection = require('@core/db');

let server = null;

const mongo = new MongoConnection(config.mongo.uri, config.mongo.options);

// establish connection to db here..
mongo.connect(() => {
  if (!server) {
    server = app.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
    });
  }
});

// Graceful shutdown of nodeJs App.
process.on('SIGTERM', () => {
  logger.info('Graceful shutdown received');
  if (server) {
    // close your db connections here.
    mongoConnection.close((err) => {
      if (err) {
        logger.error(`Error closing mongo connection ${err}`);
      }
      server.close();
    });
  }
});
