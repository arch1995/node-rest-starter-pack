const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');

const logger = require('./core/logger')(module);

// used to monkey patch all express routes with try catch blocks
// error thrown will be handled by the error handler middleware.
require('express-async-errors');

const AppRouter = require('./routes');
const {
  handleNotFoundRoutes,
  errorConverter,
  errorHandler,
} = require('./middlewares/errors');

const app = express();

// TODO: security headers.
// app.use(helmet);

// parse json request body
app.use(bodyParser.json());

// parse urlencoded request body
app.use(bodyParser.urlencoded({ extended: true }));

// TODO: sanitization of requests data.
// sanitize request data
// app.use(xss());
// app.use(mongoSanitize());

// Logger Middleware to log routes info on console.
app.use(morgan('dev', { stream: logger.stream }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// api routes with versioning enabled.
app.use('/api', AppRouter);

// send back a 404 error for any unknown api request
app.use(handleNotFoundRoutes);

// convert error to ApplicationError, if needed.
app.use(errorConverter);

// handle express app exceptions.
app.use(errorHandler);

module.exports = app;
