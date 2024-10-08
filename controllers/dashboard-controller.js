import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
import { reportStore } from "../models/report-store.js";
import { weatherCodeStore } from "../models/weather-code-store.js";

export const dashboardController = {

    // renders the user specific dashboard, displaying only the users stations with summaries
    async index(request, response) {
        const loggedInUser = await accountsController.getLoggedInUser(request);
        const stations = await stationStore.getStationsByUserId(loggedInUser._id);

        // declare locations array for passing to script in stations-map.hbs
        const locations = [];

        // loop through stations and gather data for map markers.
        for (let i = 0; i < stations.length; i++) {
            locations.push({
                title: stations[i].title,
                longitude: stations[i].longitude || null,
                latitude: stations[i].latitude || null,
            })
        }
        
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

        // get required information for each station and push to stationData array
        for(let i = 0; i < stations.length; i++) {
            const station = stations[i];
            const stationSummary = await reportStore.getStationSummary(station._id);
            const weatherInfo = await weatherCodeStore.getWeatherInfoForStation(stationSummary);
            stationData.push({...station, stationSummary, weatherInfo});

        }

        const viewData = {
            title : "Station Dashboard",
            stations: stationData,
            locations: locations,
        }
        console.log("station dashboard rendering");
        console.log(locations)
        response.render("dashboard-view", viewData);

    },

    // takes information user enters and creates a user specific station
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

    // deletes the station
    // deletes all reports associated with the station
    async deleteStation(request, response) {
        const stationId = request.params.id;

        // delete reports belonging to station first
        const stationReports = await reportStore.getAllReportsByStation(stationId);
        console.log(stationReports);
    
        for (let i = 0; i < stationReports.length; i++) {
            await reportStore.deleteReport(stationReports[i]._id);
            console.log("deleted report " + stationReports[i]._id + "from station " + stationId);
        }

        console.log(`Deleting station ${stationId}`);
        await stationStore.deleteStationById(stationId);
        response.redirect("/dashboard");
      },

      // renders the station view
    async getStation(request, response) {
        const station = await stationStore.getStationById(request.params.id);
        const viewData = {
            title: "Station",
            station: station,
        };
        response.render("station-view", viewData);
    },
};