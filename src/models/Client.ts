import mongoose, { Schema } from "mongoose";
import { BaseUserSchema, IBaseUser } from "./common";

export type IClient = IBaseUser;

const ClientSchema: Schema = BaseUserSchema;

const Client = mongoose.model<IClient>("Client", ClientSchema);
export default Client;
