import { Router } from "express";
import { createClient, findAllClients } from "../controllers/clientController";
import { findRidesByClient } from "../controllers/rideController";

const router = Router();

router.post("/", createClient);
router.get("/", findAllClients);

router.get("/:clientId/rides", findRidesByClient);

export default router;
