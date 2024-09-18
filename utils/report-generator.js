import { env } from "process";
import { metrePerSecToKPH } from "./wind-speed-converter.js";
import { whichWindDirecton } from "./wind-degrees.js";



export async function reportGenerator(stationName) {
    
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${stationName}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`;
    try {
        const response = await fetch(api);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();

        // data for report
        // round temp to nearest whole number
        // convert wind_speed from m/s to KPH and round to nearest whole number
        // convert wind direction from degrees to North etc
        const reportData = {
            code: json.weather[0].id,
            temp: Math.round(json.main.temp),
            pressure: json.main.pressure,
            wind_speed: Math.round(metrePerSecToKPH(json.wind.speed)),
            wind_direction: whichWindDirecton(json.wind.deg),
        };

        // console.log(reportData);
        return reportData;
      } catch (error) {
        console.error(error.message);
      }

}