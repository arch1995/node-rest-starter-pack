class ApplicationError extends Error {
  constructor(statusCode, message, stack) {
    super();
    if (statusCode) {
      this.statusCode = statusCode;
    }

    if (message) {
      this.message = message;
    }

    if (stack) {
      this.stack = stack;
    }
  }
}

module.exports = ApplicationError;
