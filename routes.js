import express from "express";

import { dashboardController } from "./controllers/dashboard-controller.js";
import { stationController } from "./controllers/station-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
// import { reportController } from "./controllers/report-controller.js";

export const router = express.Router();

router.get("/", accountsController.index);

router.get("/login", accountsController.login);
router.get("/signup", accountsController.signup);
router.get("/logout", accountsController.logout);
router.post("/register", accountsController.register);
router.post("/authenticate", accountsController.authenticate);

router.get("/dashboard", dashboardController.index);
router.post("/dashboard/addstation", dashboardController.addStation);
router.get("/station/:id", stationController.index);
router.post("/station/:id/addreport", stationController.addReport);