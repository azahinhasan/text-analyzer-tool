const appRoot = require("app-root-path");
const winston = require("winston");
require("winston-daily-rotate-file");

// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: "warn",
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  },
  console: {
    level: "debug",
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.prettyPrint()
    ),
  },
  appscript: {
    level: "info",
    filename: `${appRoot}/logs/appscript-%DATE%.log`,
    datePattern: "YYYY-MM-DD-HH",
    zippedArchive: true,
    handleExceptions: true,
    maxsize: 4194304, // 4MB
    maxFiles: 7,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  },
};

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
    new winston.transports.DailyRotateFile(options.appscript),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both
    // transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;
