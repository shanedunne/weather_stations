import express from "express";

import { dashboardController } from "./controllers/dashboard-controller.js";
import { stationController } from "./controllers/station-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";

export const router = express.Router();

router.get("/", accountsController.index);

router.get("/login", accountsController.login);
router.get("/signup", accountsController.signup);
router.get("/logout", accountsController.logout);
router.post("/register", accountsController.register);
router.post("/authenticate", accountsController.authenticate);

router.get("/dashboard", dashboardController.index);
router.post("/dashboard/addstation", dashboardController.addStation);
router.get("/dashboard/deletestation/:id", dashboardController.deleteStation);

router.get("/station/getWeatherCodes", stationController.getWeatherCodes);
router.get("/station/:id", stationController.index);
router.post("/station/:id/addreport", stationController.addReport);
router.get("/station/:id/generatereport", stationController.generateReport);
router.get("/station/:stationid/deletereport/:reportid", stationController.deleteReport);

router.get("/account", accountsController.getAccountInfo);
router.get("/account/:userid/editInfo", accountsController.accountEditor);
router.post("/account/:userid/updateaccount", accountsController.updateAccount);
