import mongoose, { Schema, Document } from "mongoose";

const statuses = ["pending", "accepted", "completed"] as const;
type Status = (typeof statuses)[number];

export interface IBid extends Document {
  ride: mongoose.Types.ObjectId;
  fleet: mongoose.Types.ObjectId;
  amount: number;
  status: Status;
}

const BidSchema: Schema = new Schema(
  {
    ride: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Ride" },
    fleet: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Fleet",
    },
    amount: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: statuses,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Bid = mongoose.model<IBid>("Bid", BidSchema);

export default Bid;
