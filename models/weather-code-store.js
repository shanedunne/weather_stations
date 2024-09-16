import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("weather-codes");

export const weatherCodeStore = {
  async getAllWeatherCodes() {
    await db.read();
    return db.data.weather_codes;
  },

  async getWeatherCodeInfo(weatherCode) {
    await db.read();
    
    const weatherType = await db.data.weather_codes.find((code) => code.weather_code == weatherCode);
    const icon_code = weatherType.icon_code;
    const weatherDescription = weatherType.weather_description;

    if(!weatherType) {
        console.log("Code does not exist");
        icon_code = "01d";
        weatherDescription = "Strange weather?";
    }
    console.log(weatherType)
    
    return {icon_code, weatherDescription};
  }
};
