const { createLogger, format, transports } = require("winston");
const path = require("path");

const logFormat = format.combine(
  format.colorize(), 
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), 
  format.printf(({ timestamp, level, message, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
  })
);

// Logger configuration
const logger = createLogger({
  level: "info", 
  format: logFormat,
  transports: [
    new transports.File({
      filename: path.join(__dirname, "../../logs/combined.log"),
      level: "info",
    }),
    new transports.File({
      filename: path.join(__dirname, "../../logs/error.log"),
      level: "error",
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: path.join(__dirname, "../../logs/exceptions.log"),
    }),
  ],
  rejectionHandlers: [
    new transports.File({
      filename: path.join(__dirname, "../../logs/rejections.log"),
    }),
  ],
});


if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: logFormat,
      handleExceptions: true, 
        })
  );
}

module.exports = logger;
