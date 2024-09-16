import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import { weatherCodeStore } from "../models/weather-code-store.js";
import { accountsController } from "./accounts-controller.js";



export const stationController = {
    async index(request, response) {
        const station = await stationStore.getStationById(request.params.id);
        const reports = await reportStore.getAllReportsByStation(request.params.id);

    
        const viewData = {
            title: "Station",
            station: station,
            reports: reports,
        };
        response.render("station-view", viewData);
    },

    async addReport(request, response) {
        const station = await stationStore.getStationById(request.params.id);
        const loggedInUser = await accountsController.getLoggedInUser(request);
        console.log("station ID at controller" + station._id)
        const newReport = {
            code: request.body.code,
            temp: request.body.temp,
            wind_speed: request.body.wind_speed,
            wind_direction: request.body.wind_direction,
            pressure: request.body.pressure,
            userid: loggedInUser._id,
        };
        console.log("Adding new report");
        await reportStore.addReport(station._id, newReport);
        response.redirect("/station/" + station._id);
    },

    async getWeatherCodes(request, response) {
        const weather_codes = await weatherCodeStore.getAllWeatherCodes();         
        const viewData = {
            weather_codes: weather_codes,
        };
        response.render("weather-codes-view", viewData);
    }
    
};