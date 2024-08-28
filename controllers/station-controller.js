import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";

export const stationController = {
    async index(request, response) {
        const station = await stationStore.getStationById(request.params.id);
        const reports = await reportStore.getAllReportsByStation(request.param.id);
        const viewData = {
            title: "Station",
            station: station,
            reports: reports,
        };
        response.render("station-view", viewData);
    },
};