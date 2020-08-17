const httpStatus = require('http-status-codes');
const ApplicationError = require('@utils/applicationErrors');
const logger = require('@core/logger')('app.middleware.error');
const config = require('@config/app.config');

/**
 * @description catches route not found error.
 */
const handleNotFoundRoutes = (_req, res) => {
  logger.info('Not Found Resource');
  return res.status(httpStatus.NOT_FOUND).json({
    status: httpStatus.NOT_FOUND,
    message: httpStatus.getStatusText(httpStatus.NOT_FOUND),
  });
};

/**
 * @description Converts the error to an instance of ApplicationError.
 */
const errorConverter = (err, _req, _res, next) => {
  let error = err;
  if (!(error instanceof ApplicationError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus.getStatusText[statusCode];
    error = new ApplicationError(statusCode, message, err.stack);
  }
  next(error);
};

/**
 * @description Handles express routes exceptions.
 */
const errorHandler = (err, req, res, next) => {
  const formattedErrorMessage = `${req.originalUrl} - ${req.method} - ${err.statusCode} - ${err.message}\n${err.stack}`;
  logger.error(formattedErrorMessage);

  // send error message if not sent from the application layer.
  if (!res.headersSent) {
    return res.status(err.status || 500).json({
      status: err.statusCode,
      message:
        config.env === 'development' ? err.message : 'Something went wrong!',
    });
  }
};

module.exports = {
  handleNotFoundRoutes,
  errorConverter,
  errorHandler,
};
