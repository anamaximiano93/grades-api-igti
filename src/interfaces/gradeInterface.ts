import { Document } from "mongoose";

export default interface IGrade extends Document {
  name: string;
  subject: string;
  type: string;
  value: string;
  LastModified: Date;
}
