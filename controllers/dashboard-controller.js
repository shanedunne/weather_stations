import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";

export const dashboardController = {
    async index(request, response) {
        const loggedInUser = await accountsController.getLoggedInUser(request);
        const viewData = {
            title : "Station Dashboard",
            stations: await stationStore.getStationsByUserId(loggedInUser._id),
        }
        console.log("station dashboard rendering");
        response.render("dashboard-view", viewData);
    },

    async addStation(request, response) {
        const loggedInUser = await accountsController.getLoggedInUser(request);
        const newStation = {
            title: request.body.title,
            userid: loggedInUser._id,
            longitude: request.body.longitude,
            latitude: request.body.latitude,
        };
        console.log(`adding new station: ${newStation.title}`);
        await stationStore.addStation(newStation);
        response.redirect("/dashboard");
    },

    async deleteStation(request, response) {
        const stationId = request.params.id;
        console.log(`Deleting station ${stationId}`);
        await stationStore.deleteStationById(stationId);
        response.redirect("/dashboard");
      },

    async getStation(request, response) {
        const station = await stationStore.getStationById(request.params.id);
        const viewData = {
            title: "Station",
            station: station,
        };
        response.render("station-view", viewData);
    },
};