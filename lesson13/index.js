import React from 'react';
import ReactDOM from 'react-dom';
import { scaleLinear, scaleTime, extent, timeFormat } from 'd3';
import { AxisBottom } from './AxisBottom.js';
import { AxisLeft } from './AxisLeft.js';
import { Marks } from './Marks.js';
import { useData } from './useData';

const width = 960;
const height = 600;
const margin = { top: 50, right: 50, left: 250, bottom: 80 };
const innerWidth = width - margin.right - margin.left
const innerHeight = height - margin.top - margin.bottom

const xValue = d => d.timestamp;
const xAxisLabel = 'Time';

const yValue = d => d.temperature;
const yAxisLabel = 'Temperature';

const xTickFormat = timeFormat('%a');
const yTickFormat = tickValue => tickValue;

const App = () => {

  const data = useData();

  if (!data) {
    return <div>Loading...</div>;
  }
  console.log(data);
  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xTickFormat} />
        <AxisLeft
          yScale={yScale}
          innerWidth={innerWidth}
          tickFormat={yTickFormat} />
        <Marks
          data={data}
          xValue={xValue}
          yValue={yValue}
          xScale={xScale}
          yScale={yScale}
          circleRadius={2}
        />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight}
          dy={50}
          textAnchor="middle"
          >{xAxisLabel}</text>
        <text transform={`translate(0, ${innerHeight / 2}) rotate(-90)`}
          className="axis-label"
          dy={-50}
          textAnchor="middle"
        >{yAxisLabel}</text>
      </g>
    </svg>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);