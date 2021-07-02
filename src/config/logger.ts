import winston from "winston";
require("winston-mongodb");

import config from "./config";

const { combine, timestamp, label, printf } = winston.format;

const { createLogger } = winston;

const transports: any = winston.transports;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

let logger: winston.Logger;

try {
  logger = createLogger({
    transports: [
      new transports.MongoDB({
        level: "info",
        db: config.mongolog.url,
        collection: "logs_grades",
        capped: true,
        cappedMax: 20,
        options: config.mongolog.options,
      }),
    ],
    format: combine(label({ label: "grade-api" }), timestamp(), myFormat),
  });
} catch (error) {
  console.log("Erro no proprio logger", error);
}
export { logger };
