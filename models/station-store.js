import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { trackStore } from "./track-store.js";

const db = initStore("stations");

export const stationStore = {
    async getAllStations() {
        await db.read();
        return db.data.stations;
    },
};
