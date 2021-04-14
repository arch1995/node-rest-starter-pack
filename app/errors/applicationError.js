const { INTERNAL_SERVER_ERROR, getStatusText } = require("http-status-codes");
const BaseError = require("./baseError");

class ApplicationError extends BaseError {
  constructor(metadata = null, reportToSentry = true) {
    super(
      INTERNAL_SERVER_ERROR,
      getStatusText(INTERNAL_SERVER_ERROR),
      metadata,
      reportToSentry
    );
  }
}

module.exports = ApplicationError;
