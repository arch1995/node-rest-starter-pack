const config = require('@config/app.config');
const isDev = config.env === 'development';

class BaseError extends Error {
  constructor(statusCode, message, metadata = null, reportToSentry = true) {
    super();

    this.statusCode = statusCode;
    this.message = message;
    this.reportToSentry = isDev ? false : reportToSentry;
    this.metadata = metadata;
  }
}

module.exports = BaseError;
