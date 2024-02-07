import { Request, Response } from "express";
import * as rideService from "../services/rideService";

export const createRide = async (req: Request, res: Response) => {
  try {
    const ride = await rideService.createRide(req.body);
    res.status(201).json(ride);
  } catch (error) {
    error instanceof Error
      ? res.status(400).send(error.message)
      : res.status(500);
  }
};

export const findAllRides = async (req: Request, res: Response) => {
  try {
    const rides = await rideService.findAllRides();
    res.json(rides);
  } catch (error) {
    error instanceof Error
      ? res.status(500).send(error.message)
      : res.status(500);
  }
};

export const findRidesByClient = async (req: Request, res: Response) => {
  const { clientId } = req.params;
  try {
    const rides = await rideService.findRidesByClient(clientId);
    res.json(rides);
  } catch (error) {
    error instanceof Error
      ? res.status(500).send(error.message)
      : res.status(500);
  }
};
