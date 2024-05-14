import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { WeatherData } from "../../types";

interface LineChartProps {
  data: WeatherData[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  width = 800,
  height = 400,
  margin = { top: 20, right: 30, bottom: 30, left: 40 },
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, 100]) // Assuming humidity range is 0-100%
      .range([height - margin.bottom, margin.top]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis);

    const lineGenerator = d3
      .line<WeatherData>()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d.temperature)); // Temperature line

    const humidityLineGenerator = d3
      .line<WeatherData>()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d.humidity)); // Humidity line

    svg
      .append("path")
      .datum(data)
      .attr("d", lineGenerator)
      .attr("fill", "none")
      .attr("stroke", "blue");

    svg
      .append("path")
      .datum(data)
      .attr("d", humidityLineGenerator)
      .attr("fill", "none")
      .attr("stroke", "green");
  }, [data, width, height, margin]);

  return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default LineChart;
