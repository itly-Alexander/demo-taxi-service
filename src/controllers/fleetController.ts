import { Request, Response } from "express";
import * as fleetService from "../services/fleetService";

export const createFleet = async (req: Request, res: Response) => {
  try {
    const fleet = await fleetService.createFleet(req.body);
    res.status(201).json(fleet);
  } catch (error) {
    error instanceof Error
      ? res.status(400).send(error.message)
      : res.status(500);
  }
};

export const findAllFleets = async (req: Request, res: Response) => {
  try {
    const fleets = await fleetService.findAllFleets();
    res.json(fleets);
  } catch (error) {
    error instanceof Error
      ? res.status(500).send(error.message)
      : res.status(500);
  }
};
