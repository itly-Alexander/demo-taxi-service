import mongoose, { Schema } from "mongoose";
import { BaseUserSchema, IBaseUser } from "./common";

export type IFleet = IBaseUser;

const FleetSchema: Schema = BaseUserSchema;

const Fleet = mongoose.model<IFleet>("Fleet", FleetSchema);
export default Fleet;
