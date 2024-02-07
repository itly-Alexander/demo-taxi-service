import { Router } from "express";
import { createFleet, findAllFleets } from "../controllers/fleetController";

const router = Router();

router.post("/", createFleet);
router.get("/", findAllFleets);

export default router;
