import { type FC, useEffect } from "react";
import LineChart from "./components/LineChart/LineChart";
import BarChart from "./components/BarChart/BarChart";
import { fetchData } from "./redux/actions";
import { useDispatch } from "react-redux";
import "./App.css";

const App: FC = () => {
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
        <LineChart />
      </div>
      <div className="right-box">
        <BarChart />
      </div>
    </div>
  );
};

export default App;
