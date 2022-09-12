import React from "react";
import ReactDOM from "react-dom";
import {
  scaleLinear,
  scaleTime,
  extent,
  timeFormat,
  timeMonths,
  min,
  max,
  sum,
  histogram as bin,
} from "d3";
import { AxisBottom } from "./AxisBottom.js";
import { AxisLeft } from "./AxisLeft.js";
import { Marks } from "./Marks.js";
import { useData } from "./useData";

// const width = window.width;
// const height = window.height;
const width = 900;
const height = 500;
const margin = { top: 20, right: 20, bottom: 50, left: 150 };
const innerWidth = width - margin.right - margin.left;
const innerHeight = height - margin.top - margin.bottom;

const circleRadius = 3;

const yTickFormat = d3.format("d");
const xTickFormat = timeFormat("%Y");

const threshold = new Date(2014, 1, 1);

const App = () => {
  let data = useData();

  const xValue = (d) => d.date;
  const xAxisLabel = "Date";

  const yValue = (d) => d.total;
  const yAxisLabel = "Dead or missing";

  if (!data) {
    return <div>Loading...</div>;
  }

  // data = data.filter((d) => d.date > threshold);

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const [start, stop] = xScale.domain()

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(d3.timeMonths(start, stop))(
      data
    ).map(array => ({
      y: sum(array, yValue),
      x0: array.x0,
      x1: array.x1
    }));

  const yScale = scaleLinear()
    .domain([0, max(binnedData, b => b.y)])
    .range([innerHeight, 0])
    .nice();

  return (
    <>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xTickFormat}
          />
          <AxisLeft
            yScale={yScale}
            innerWidth={innerWidth}
            tickFormat={yTickFormat}
          />
          <Marks
            data={binnedData}
            yScale={yScale}
            xScale={xScale}
            xValue={xValue}
            yValue={yValue}
            innerHeight={innerHeight}
            circleRadius={circleRadius}
          />
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={innerHeight}
            dy={50}
            textAnchor="middle"
          >
            {xAxisLabel}
          </text>
          <text
            transform={`translate(0, ${innerHeight / 2}) rotate(-90)`}
            className="axis-label"
            dy={-75}
            textAnchor="middle"
          >
            {yAxisLabel}
          </text>
        </g>
      </svg>
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
