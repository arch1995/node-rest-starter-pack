class ApplicationError extends Error {
  constructor(statusCode, message) {
    super();
    if (statusCode) {
      this.statusCode = statusCode;
    }

    if (message) {
      this.message = message;
    }
  }
}

module.exports = ApplicationError;
