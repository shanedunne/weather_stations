import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("reports");

export const reportStore = {
    async getAllReportsByStation(stationId) {
        return db.data.reports.filter((report) => report.station_id === stationId);
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
}