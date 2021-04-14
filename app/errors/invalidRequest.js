const { EXPECTATION_FAILED, getStatusText } = require('http-status-codes');
const BaseError = require('./baseError');

class InvalidRequestError extends BaseError {
  constructor(
    message = getStatusText(EXPECTATION_FAILED),
    metadata = null,
    reportToSentry = false,
  ) {
    super(EXPECTATION_FAILED, message, metadata, reportToSentry);
  }
}

module.exports = InvalidRequestError;
