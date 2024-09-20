import axios from "axios";
import { env } from "process";
import { metrePerSecToKPH } from "./wind-speed-converter.js";
import { whichWindDirecton } from "./wind-degrees.js";


// calls the OpenWeatherMap API to retreive a report based on the station name passed to it
export async function reportGenerator(stationName) {
    
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${stationName}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`;
    try {
        const response = await axios.get(api);

        if (response.status === 404) {
          throw new Error(`Response status: ${response.status}`);
        }
        
        const result = response.data;

        // data for report
        // round temp to nearest whole number
        // convert wind_speed from m/s to KPH and round to nearest whole number
        // convert wind direction from degrees to North etc
        const reportData = {
            code: result.weather[0].id,
            temp: Math.round(result.main.temp),
            pressure: result.main.pressure,
            wind_speed: Math.round(metrePerSecToKPH(result.wind.speed)),
            wind_direction: whichWindDirecton(result.wind.deg),
        };

        console.log(reportData);
        return reportData;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return {error : "Station not found in api database"}
        }
        console.error(error.message);
        return {error: "there was an issue accessing the data"}
      }

}