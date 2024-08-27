import express from "express";

import { stationController } from "./controllers/station-controller.js";

export const router = express.Router;

router.get("/", stationController.index);