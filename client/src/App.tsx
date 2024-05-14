import React, { useEffect, useState } from "react";
import LineChart from "./components/LineChart/LineChart";
import BarChart from "./components/BarChart/BarChart";
import { AppState } from "./redux/store";
import { fetchData } from "./redux/actions";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";

const App: React.FC = () => {
  const weatherData = useSelector((state: AppState) => state.weatherData);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      dispatch(await fetchData());
    };
    loadData();
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
