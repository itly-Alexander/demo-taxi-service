import { Document, Schema } from "mongoose";

export interface IBaseUser extends Document {
  name: string;
  email: string;
  phone: string;
}

export const BaseUserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    phone: {
      type: String,
      required: true,
      match: [/\+?[1-9]\d{1,14}$/, "Please fill a valid phone number"],
    },
  },
  {
    timestamps: true,
  }
);
