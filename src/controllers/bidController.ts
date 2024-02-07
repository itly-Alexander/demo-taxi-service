import { Request, Response } from "express";
import * as bidService from "../services/bidService";

export const createBid = async (req: Request, res: Response) => {
  const { rideId } = req.params;

  try {
    const bid = await bidService.createBid({ ride: rideId, ...req.body });
    res.status(201).json(bid);
  } catch (error) {
    error instanceof Error
      ? res.status(400).send(error.message)
      : res.status(500);
  }
};

export const findBidsByRide = async (req: Request, res: Response) => {
  const { rideId } = req.params;

  try {
    const bids = await bidService.findBidsByRide(rideId);
    res.status(200).json(bids);
  } catch (error) {
    error instanceof Error
      ? res.status(500).send(error.message)
      : res.status(500);
  }
};

export const acceptBid = async (req: Request, res: Response) => {
  const { rideId, bidId } = req.params;

  try {
    const acceptedBid = await bidService.acceptBid(rideId, bidId);
    res.status(200).json(acceptedBid);
  } catch (error) {
    error instanceof Error
      ? res.status(400).send(error.message)
      : res.status(500);
  }
};
