const mongoose = require('mongoose');

const config = require('@config/app.config');
const logger = require('./logger')('app.core.db');

/**
 * A Mongoose Connection wrapper class to
 * help with mongo connection issues.
 *
 * This class tries to auto-reconnect to
 * MongoDB without crashing the server.
 */
class MongoConnection {
  /**
   * Start mongo connection
   * @param mongoUrl MongoDB URL
   */
  constructor(mongoUrl, options) {
    if (config.env === 'development') {
      mongoose.set('debug', true);
    }

    this.mongoUrl = mongoUrl;
    this.mongoConnectionOptions = options;
    this.isConnectedBefore = false;
    this.onConnectedCallback = null;

    // Native Mongo Events...
    mongoose.connection.on('disconnected', () => this.onDisconnected());
    mongoose.connection.on('connected', () => this.onConnected());
  }

  /**
   * Close mongo connection
   * @public
   */
  close(onClosed) {
    logger.info('Terminatiing the MongoDB connection');
    mongoose.connection.close(onClosed);
  }

  /**
   * Start mongo connection
   * @public
   */
  connect(onConnectedCallback) {
    this.onConnectedCallback = onConnectedCallback;
    this.startConnection();
  }

  /**
   * @private
   */
  startConnection() {
    logger.info(`Connecting to MongoDB`);
    mongoose
      .connect(this.mongoUrl, this.mongoConnectionOptions)
      .catch((err) => {
        this.isConnectedBefore = false;
        logger.error(`Could not connect to mongodb instance ${err}`);
      });
  }

  /**
   * Handler called when mongo connection is established
   * @private
   */
  onConnected() {
    logger.info(`Connected to MongoDB`);
    this.isConnectedBefore = true;
    if (this.onConnectedCallback) {
      this.onConnectedCallback();
    }
  }

  /**
   * Handler called when mongo connection is lost
   * @private
   */
  onDisconnected() {
    this.isConnectedBefore = false;
    logger.error(
      `Mongo connection terminated. Retrying in ${config.mongo.retryTimeout}ms....`,
    );
    // mongo connection retry logic.
    setTimeout(() => {
      if (!this.isConnectedBefore) {
        this.startConnection();
      }
    }, config.mongo.retryTimeout);
  }
}

module.exports = MongoConnection;
