import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import { weatherCodeStore } from "../models/weather-code-store.js";
import { accountsController } from "./accounts-controller.js";
import { reportGenerator } from "../utils/report-generator.js";



export const stationController = {

    // renders the station view and displays station specific information
    async index(request, response) {
        const station = await stationStore.getStationById(request.params.id);
        const reports = await reportStore.getAllReportsByStation(request.params.id);
        const stationSummary = await reportStore.getStationSummary(request.params.id);
        const weatherInfo = await weatherCodeStore.getWeatherInfoForStation(stationSummary);
        
        // declare chartData object and nested arrays for chart
        const chartData = {};
        chartData.tempTrend = [];
        chartData.time = [];

        // declare that the chart should declare 7 data points
        let chartPoints = 7;

        // ensures that if there is less than 7 data points, the chart renders the max it can < 7
        if (reports.length < 7) {
            chartPoints = reports.length;
        } 

        // loop through the reports to extract the data
        for (let i = 0; i < chartPoints; i++) {
            chartData.tempTrend.push(Math.round(reports[i].temp));
            chartData.time.push(reports[i].timestamp);
        }
        

        const viewData = {
            title: "Station",
            station: station,
            reports: reports,
            stationSummary: stationSummary,
            weatherInfo: weatherInfo,
            chartData: chartData,
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
            temp: parseInt(request.body.temp),
            wind_speed: parseInt(request.body.wind_speed),
            wind_direction: request.body.wind_direction,
            pressure: parseInt(request.body.pressure),
            userid: loggedInUser._id,
            timestamp: new Date().toISOString(),
        };
        console.log("Adding new report");
        await reportStore.addReport(station._id, newReport);
        response.redirect("/station/" + station._id);
    },

    // adds a report to the users station and redirects to the station
    async generateReport(request, response) {
        const station = await stationStore.getStationById(request.params.id);
        const loggedInUser = await accountsController.getLoggedInUser(request);
        console.log("station ID at controller" + station._id)

        const reportData = await reportGenerator(station.title);
        console.log(reportData);
    
        const generatedReport = {
            code: reportData.code,
            temp: reportData.temp,
            wind_speed: reportData.wind_speed,
            wind_direction: reportData.wind_direction,
            pressure: reportData.pressure,
            userid: loggedInUser._id,
            timestamp: new Date().toISOString(),
        };
    
        console.log("Generating new report");
        await reportStore.addReport(station._id, generatedReport);
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