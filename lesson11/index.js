import React from 'react';
import ReactDOM from 'react-dom';
import { scaleBand, scaleLinear, max } from 'd3';
import { AxisBottom } from './AxisBottom.js';
import { AxisLeft } from './AxisLeft.js';
import { Marks } from './Marks.js';
import { useData } from './useData';

const width = 960;
const height = 300;
const margin = { top: 50, right: 50, left: 250, bottom: 50 };
const innerWidth = width - margin.right - margin.left
const innerHeight = height - margin.top - margin.bottom

const xValue = d => d.population;
const yValue = d => d.country;

const App = () => {

  const data = useData();

  if (!data) {
    return <div>Loading...</div>;
  }

  const xScale = scaleLinear().
    domain([0, max(data, xValue)]).
    range([0, innerWidth]);

  const yScale = scaleBand().
    domain(data.map(yValue)).
    range([0, innerHeight]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} />
        <AxisLeft yScale={yScale} />
        <Marks
          data={data}
          xValue={xValue}
          yValue={yValue}
          xScale={xScale}
          yScale={yScale}
        />
      </g>
    </svg>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);