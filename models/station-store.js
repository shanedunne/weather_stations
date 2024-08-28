import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("stations");

export const stationStore = {
    async getAllStations() {
        await db.read();
        return db.data.stations;
    },

    async addStation(station) {
        await db.read();
        // add the below to check for first data creation
        // if no previous input, initialise db

        if (!db.data.stations) {
            db.data.stations = [];
        }
        station._id = v4();
        db.data.stations.push(station);
        await db.write();
        return station;
    },

    async getStationById(id) {
        await db.read();
        const stationById = db.data.stations.find((station) => station._id === id);
        return stationById;
    }
};
