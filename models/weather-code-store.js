import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("weather-codes");

export const weatherCodeStore = {
  async getAllWeatherCodes() {
    await db.read();
    return db.data.weather_codes;
  },
};
