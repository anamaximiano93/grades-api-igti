import mongoose, { Model, Mongoose } from "mongoose";
import { format } from "winston";
import IGrade from "../interfaces/gradeInterface";
import gradeModel from "./gradeModel";

import config from "../config/config";

interface IDb {
  url: string;
  options: {};
  mongoose: Mongoose;
  gradesModel: Model<IGrade>;
}

const db: IDb = {
  url: config.mongo.url,
  options: config.mongo.options,
  mongoose: mongoose,
  gradesModel: gradeModel,
};

export { db };
