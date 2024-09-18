import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import { weatherCodeStore } from "../models/weather-code-store.js";
import { accountsController } from "./accounts-controller.js";



export const stationController = {

    // renders the station view and displays station specific information
    async index(request, response) {
        const station = await stationStore.getStationById(request.params.id);
        const reports = await reportStore.getAllReportsByStation(request.params.id);
        const stationSummary = await reportStore.getStationSummary(request.params.id);
        const weatherInfo = await weatherCodeStore.getWeatherInfoForStation(stationSummary);

    
        const viewData = {
            title: "Station",
            station: station,
            reports: reports,
            stationSummary: stationSummary,
            weatherInfo: weatherInfo,
        };
        response.render("station-view", viewData);
    },

    // adds a report to the users station and redirects to the station
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
            timestamp: new Date().toISOString(),
        };
        console.log("Adding new report");
        await reportStore.addReport(station._id, newReport);
        response.redirect("/station/" + station._id);
    },

    // deletes the selected report and redirects to the station
    async deleteReport(request, response) {
        const stationId = request.params.stationid;
        const reportId = request.params.reportid;
        console.log(`Deleting report ${reportId} from station ${stationId}`);
        await reportStore.deleteReport(reportId);
        response.redirect("/station/" + stationId);
    },

    // renders the weather codes view where users can see a full list of weather codes for input
    async getWeatherCodes(request, response) {
        const weather_codes = await weatherCodeStore.getAllWeatherCodes();         
        const viewData = {
            weather_codes: weather_codes,
        };
        response.render("weather-codes-view", viewData);
    },
    
};