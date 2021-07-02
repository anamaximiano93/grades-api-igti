import dotenv from "dotenv";

import mongoose from "mongoose";

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

dotenv.config();

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  /*  socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false,
    retryWrites: false */
};

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_HOST_LOG = process.env.MONGO_HOST_LOG;
const MONGO_DATABASE = process.env.MONGO_DATABASE;

const MONGO = {
  host: MONGO_HOST,
  password: MONGO_PASSWORD,
  username: MONGO_USERNAME,
  cluster: MONGO_DATABASE,
  options: MONGO_OPTIONS,
  url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}?retryWrites=true&w=majority`,
};
const MONGOLOG = {
  host: MONGO_HOST,
  cluster: MONGO_DATABASE,
  password: MONGO_PASSWORD,
  username: MONGO_USERNAME,
  options: MONGO_OPTIONS,
  url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST_LOG}:27017/${MONGO_DATABASE}?retryWrites=true&ssl=true&authSource=admin&&w=majority&replicaSet=rs1`,
};

const config = {
  mongo: MONGO,
  mongolog: MONGOLOG,
};

export default config;
