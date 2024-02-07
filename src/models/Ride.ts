import mongoose, { Schema, Document } from "mongoose";

export interface IRide extends Document {
  client: mongoose.Types.ObjectId;
  pickupLocation: string;
  pickupTime: Date;
  dropoffLocation: string;
  proposedPrice: number;
  bids: mongoose.Types.ObjectId[];
}

const RideSchema: Schema = new Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Client",
    },
    pickupLocation: { type: String, required: true },
    pickupTime: { type: Date, required: true },
    dropoffLocation: { type: String, required: true },
    proposedPrice: { type: Number, required: true },
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }],
  },
  {
    timestamps: true,
  }
);

const Ride = mongoose.model<IRide>("Ride", RideSchema);

export default Ride;
