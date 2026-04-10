import winston from "winston";

const level = process.env.LOG_LEVEL ?? "info";

const consoleFormat = winston.format.combine(
  winston.format.errors({ stack: true }),
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf((info) => {
    const { timestamp, level, message, stack } = info;
    if (stack) {
      return `${timestamp} ${level}: ${message}\n${stack}`;
    }
    return `${timestamp} ${level}: ${message}`;
  })
);

export const logger = winston.createLogger({
  level,
  transports: [new winston.transports.Console({ format: consoleFormat })],
});
