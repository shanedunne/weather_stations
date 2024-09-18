import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("weather-codes");

export const weatherCodeStore = {

  // gets all weather codes from the json file
  async getAllWeatherCodes() {
    await db.read();
    return db.data.weather_codes;
  },

  // gets all information associated with a specific weather code
  async getWeatherCodeInfo(weatherCode) {
    await db.read();

    const weatherType = await db.data.weather_codes.find(
      (code) => code.weather_code == weatherCode
    );

    // check to see if weatherType exists for code provided by user. If not, assign default return values.
    if (!weatherType) {
      console.log("Code does not exist");
      return {
        icon_code: "01d",
        weatherDescription: "Strange weather?",
      };
    }
    // correctly assign values if weather type exists
    const icon_code = weatherType.icon_code;
    const weatherDescription = weatherType.weather_description;

    console.log(weatherType);

    return { icon_code, weatherDescription };
  },

  // checks to see if there is a stationSummary and a stationSummary code provided, if not, returns defualts. 
  // otherwise, calls getWeatherCodeInfo and returns correct values
  async getWeatherInfoForStation(stationSummary) {
    
    // set default values if code is not in database
    if (!stationSummary || !stationSummary.code) {
      return {
        icon_code: "01d",
        weatherDescription: "No weather data available",
      };
    }

    // If code is correct, return
    return await this.getWeatherCodeInfo(stationSummary.code);
  },
};
