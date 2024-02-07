import Fleet, { IFleet } from "../models/Fleet";

export const createFleet = async (fleetData: IFleet) => {
  const fleet = new Fleet(fleetData);

  return await fleet.save();
};

export const findAllFleets = async () => {
  return await Fleet.find();
};
