const winston = require('winston');

const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf } = format;

// template string format for the console logs.
const consoleFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level.toUpperCase()}: ${message}`;
});

function logger(module) {
  const logTransports = [
    new transports.Console({
      level: 'debug',
      format: combine(
        label({ label: getFilePath(module) }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        consoleFormat,
      ),
      handleException: true,
      json: false,
      colorize: true,
      prettyPrint: true,
    }),
  ];

  // create new winston logger instance.
  const logger = createLogger({
    transports: logTransports,
    defaultMeta: { service: 'api' },
  });

  // added this so that winston doesn't exit on unhandled exceptions error.
  logger.exitOnError = false;

  // create a stream object with a 'write' function that will be used by `morgan`
  logger.stream = {
    write: function (message, encoding) {
      // use the 'info' log level so the output will be picked up by both transports (file and console)
      logger.info(message);
    },
  };
  return logger;
}

function getFilePath(module) {
  // Add filename in log statements
  return module.filename.split('/').slice(-2).join('/');
}

module.exports = logger;
