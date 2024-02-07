import Ride, { IRide } from "../models/Ride";

export const createRide = async (rideData: IRide) => {
  const ride = new Ride(rideData);

  return await ride.save();
};

export const findAllRides = async () => {
  return await Ride.find();
};

export const findRidesByClient = async (clientId: string) => {
  return await Ride.find({ client: clientId });
};
