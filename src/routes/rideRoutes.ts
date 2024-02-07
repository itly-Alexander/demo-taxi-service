import { Router } from "express";
import { createRide, findAllRides } from "../controllers/rideController";
import {
  acceptBid,
  createBid,
  findBidsByRide,
} from "../controllers/bidController";

const router = Router();

router.post("/", createRide);
router.get("/", findAllRides);

router.post("/:rideId/bids", createBid);
router.get("/:rideId/bids", findBidsByRide);
router.patch("/:rideId/bids/:bidId/accept", acceptBid);

export default router;
