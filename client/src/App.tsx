import React, { useEffect, useState } from "react";
import LineChart from "./components/LineChart/LineChart";
import BarChart from "./components/BarChart/BarChart";
import { fetchWeatherData } from "./api";
import { WeatherData } from "./types";
import "./App.css";

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  useEffect(() => {
    const loadWeatherData = async () => {
      const response = await fetchWeatherData();
      setWeatherData(response);
    };
    loadWeatherData();
  }, []);

  return (
    <div className="app-container">
      <div className="left-box">
        <LineChart data={weatherData} />
      </div>
      <div className="right-box">
        <BarChart data={weatherData} />
      </div>
    </div>
  );
};

export default App;
