import winston from "winston";
import winstondb from "winston-mongodb";
//require("winston-mongodb");

const { combine, timestamp, label, printf } = winston.format;

const { createLogger, transports } = winston;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  transports: [
    // new transports.Console(),
    new transports.MongoDB({
      /*  db: process.env.MONGOLOGDB,
      host: process.env.MONGOLOGHOST,
      username: process.env.MONGOLOGUSER,
      password: process.env.MONGOLOGPWD, */
      level: "info",
      db: process.env.MONGOLOG,
      collection: "logs_grades",
      capped: true,
      cappedMax: 20,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
  ],
  format: combine(label({ label: "grade-api" }), timestamp(), myFormat),
});

export { logger };
