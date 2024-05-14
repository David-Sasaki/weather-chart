import { type FC, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { WeatherData } from "../../types";

interface BarChartProps {
  data: WeatherData[];
  width?: number;
  height?: number;
}

const BarChart: FC<BarChartProps> = ({ data, width = 800, height = 400 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart>();

  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Destroy existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const labels = data.map((_, index) => `Day ${index + 1}`);
    const temperatures = data.map((item) => item.temperature);
    const humidities = data.map((item) => item.humidity);

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Temperature",
            data: temperatures,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
          {
            label: "Humidity",
            data: humidities,
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup function to destroy chart instance
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, width, height]);

  return <canvas ref={canvasRef} width={width} height={height}></canvas>;
};

export default BarChart;
