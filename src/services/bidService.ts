import { Types } from "mongoose";
import Bid, { IBid } from "../models/Bid";

export const findBidsByRide = async (rideId: string) => {
  return await Bid.find({ ride: rideId });
};

export const createBid = async (bidData: IBid) => {
  const alreadyAcceptedBid = await findAcceptedBid(bidData.ride);

  if (alreadyAcceptedBid) {
    throw new Error("Ride has already been accepted");
  }

  const bid = new Bid(bidData);

  return await bid.save();
};

export const acceptBid = async (rideId: string, bidId: string) => {
  const alreadyAcceptedBid = await findAcceptedBid(rideId);

  if (alreadyAcceptedBid) {
    throw new Error("Ride has already been accepted");
  }

  const updatedBid = await Bid.findByIdAndUpdate(
    bidId,
    { status: "accepted" },
    { new: true }
  );

  if (!updatedBid) {
    throw new Error("Bid not found");
  }

  return updatedBid;
};

const findAcceptedBid = async (rideId: string | Types.ObjectId) => {
  return await Bid.findOne({
    ride: rideId,
    status: "accepted",
  });
};
