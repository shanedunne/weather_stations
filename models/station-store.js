import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("stations");

export const stationStore = {

    // gets all stations
    async getAllStations() {
        await db.read();
        return db.data.stations;
    },

    // adds a station to the json file
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

    // deletes a station by its id
    async deleteStationById(id) {
        await db.read();
        const index = db.data.stations.findIndex((station) => station._id === id);
        db.data.stations.splice(index, 1);
        await db.write();
    },

    // gets the station data by its id
    async getStationById(id) {
        await db.read();
        const stationById = db.data.stations.find((station) => station._id === id);
        return stationById;
    },

    // gets the stations associated to a specific user
    async getStationsByUserId(userid) {
        await db.read();
        return db.data.stations.filter((station) => station.userid === userid);
      },
    
};
