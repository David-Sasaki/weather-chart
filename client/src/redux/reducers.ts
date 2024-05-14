import { FETCH_DATA } from './actions';
import { WeatherData } from "../types";

interface WeatherState {
    weatherData: WeatherData[];
}

const initialState: WeatherState = {
    weatherData: [],
};

const weatherReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_DATA:
            return { ...state, weatherData: [...action.payload] };
        default:
            return state;
    }
}

export default weatherReducer;
