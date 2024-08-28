import { stationStore } from "../models/station-store.js";

export const stationController = {
    async index(request, response) {
        const viewData = {
            title : "Station Dashboard",
            stations: await stationStore.getAllStations(),
        }
        console.log("station dashboard rendering");
        response.render("dashboard-view", viewData);
    },

    async addStation(request, response) {
        const newStation = {
            title: request.body.title,
        };
        console.log(`adding new station: ${newStation.title}`);
        await stationStore.addStation(newStation);
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