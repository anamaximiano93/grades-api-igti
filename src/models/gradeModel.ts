import mongoose, { Schema } from "mongoose";
import IGrade from "../interfaces/gradeInterface";

require("dotenv").config();

const Gradeschema = new Schema<IGrade>({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  lastModified: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model<IGrade>(
  process.env.NODE_ENV === "test" ? "test_grade" : "students",
  Gradeschema
);
