import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
import { reportStore } from "../models/report-store.js";
import { weatherCodeStore } from "../models/weather-code-store.js";

export const dashboardController = {
    async index(request, response) {
        const loggedInUser = await accountsController.getLoggedInUser(request);
        // const stationSummary = await reportStore.getStationSummary(request.params.id);
        const stations = await stationStore.getStationsByUserId(loggedInUser._id);

        // sort stations alphabetically
        stations.sort(function (a, b) {
            if (a.title < b.title) {
                return -1;
            } 
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        })

        // declare an empty array to hold station data
        const stationData = [];
        for(let i = 0; i < stations.length; i++) {
            const station = stations[i];
            const stationSummary = await reportStore.getStationSummary(station._id);
            const weatherInfo = await weatherCodeStore.getWeatherInfoForStation(stationSummary);
            stationData.push({...station, stationSummary, weatherInfo});

        }

        const viewData = {
            title : "Station Dashboard",
            stations: stationData,
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