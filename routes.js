import express from "express";

import { stationDashboardController } from "./controllers/station-dashboard-controller.js";
import { stationController } from "./controllers/station-controller.js";
// import { reportController } from "./controllers/report-controller.js";

export const router = express.Router();

router.get("/", stationDashboardController.index);
router.get("/dashboard", stationDashboardController.index);
router.post("/dashboard/addstation", stationDashboardController.addStation);
router.get("/station/:id", stationController.index);
router.post("/station/:id/addreport", stationController.addReport);