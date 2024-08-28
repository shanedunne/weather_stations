import express from "express";

import { stationController } from "./controllers/station-controller.js";

export const router = express.Router();

router.get("/", stationController.index);
router.get("/dashboard", stationController.index);
router.post("/dashboard/addstation", stationController.addStation);
router.get("/station/:id", stationController.getStation);