import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

interface WeatherData {
    temperature: number;
    humidity: number;
}

export const getHistoricalWeather = async (location: string = "Miami"): Promise<WeatherData[]> => {
    const response = await axios.get(
        `${BASE_URL}${location}`,
        {
            params: {
                key: API_KEY,
                include: 'temp,humidity',
            },
        }
    );
    return response.data.days.map((day: any) => ({
        temperature: day.temp,
        humidity: day.humidity,
    }));
};

export const getForecastWeather = async (location: string): Promise<WeatherData[]> => {
    const response = await axios.get(
        `${BASE_URL}${location}?include=fcst`,
        {
            params: {
                key: API_KEY,
                include: 'temp,humidity',
            },
        }
    );
    return response.data.days.map((day: any) => ({
        temperature: day.temp,
        humidity: day.humidity,
    }));
};
