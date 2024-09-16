import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("reports");

export const reportStore = {
  async getAllReportsByStation(stationId) {
    await db.read();

    if (db.data === null) {
      console.log("no entries yet");
    } else {
      const filteredReports = db.data.reports.filter(
        (report) => report.station_id === stationId
      );
      return filteredReports;
    }
  },

  async addReport(stationId, report) {
    await db.read();

    if (!db.data.reports) {
      db.data.reports = [];
    }
    report._id = v4();
    report.station_id = stationId;
    db.data.reports.push(report);
    await db.write();
    return report;
  },

  async getLatestStationReport(reports) {
    if (reports.length === 0) return null;

    const latestReport = reports.reduce((latest, report) => {
      return new Date(report.timestamp) > new Date(latest.timestamp) ? report : latest;
    })
    return latestReport;
  },

  async getMinMaxValues(reports, field) {
    const max = Math.max(...reports.map((report) => report[field]));
    const min = Math.min(...reports.map((report) => report[field]));
    return { max, min };
  },

  async getStationSummary(stationId){
    const stationReports = await this.getAllReportsByStation(stationId);

    if(stationReports.length === 0) {
      return null;
    }

    // most recent report
    const latestReport = await this.getLatestStationReport(stationReports);

    // get values required from most recent report
    const temp = latestReport.temp;
    const wind_speed = latestReport.wind_speed;
    const wind_direction = latestReport.wind_direction;
    const pressure = latestReport.pressure;
    const code = latestReport.code;

    // get max and min values from all reports
    const maxTemp = (await this.getMinMaxValues(stationReports, "temp")).max;
    const minTemp = (await this.getMinMaxValues(stationReports, "temp")).min;
    const maxWindSpeed = (await this.getMinMaxValues(stationReports, "wind_speed")).max;
    const minWindSpeed = (await this.getMinMaxValues(stationReports, "wind_speed")).min;
    const maxPressure = (await this.getMinMaxValues(stationReports, "pressure")).max;
    const minPressure = (await this.getMinMaxValues(stationReports, "pressure")).min;

    return {temp, wind_speed, wind_direction, pressure, code, maxTemp, minTemp, maxWindSpeed, minWindSpeed, maxPressure, minPressure};

  }



};
