import axios from "axios";
import { WeatherData } from "../types";
import { FETCH_DATA } from "./store.consts";

const fetchWeatherData = async () => {
    const response = await axios.get(process.env.REACT_APP_WEATHER_URL || "");
    const data = response["data"]["days"][0]["hours"];
    const weatherData: WeatherData[] = data.map((value: any) => ({
        temperature: value["temp"],
        humidity: value["humidity"],
    }));
    return weatherData;
}

export const fetchData = async () => {
    const reponse = await fetchWeatherData();
    return { type: FETCH_DATA, payload: reponse };
}
