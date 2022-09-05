import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { scaleLinear, extent } from 'd3';
import { AxisBottom } from './AxisBottom.js';
import { AxisLeft } from './AxisLeft.js';
import { Marks } from './Marks.js';
import { useData } from './useData';
import ReactDropdown from 'react-dropdown';

const width = 960;
const menuHeight = 80;
const height = 500 - menuHeight;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const innerWidth = width - margin.right - margin.left
const innerHeight = height - margin.top - margin.bottom

const tickFormat = tickValue => d3.format('.1f')(tickValue);

const options = [
  { value: "sepal_length", label: "Sepal Length" },
  { value: "sepal_width", label: "Sepal Width" },
  { value: "petal_length", label: "Petal Length" },
  { value: "petal_width", label: "Petal Width" },
  { value: "species", label: "Species" }
];

const getLabel = label => {
  for (let i = 0; i < options.length; i++) {
    if (label == options[i].value) {
      return options[i].label;
    }
  }
};

const App = () => {

  const data = useData();

  const initialXAttribute = 'sepal_length';
  const [xAttribute, setSelectedXAttribute] = useState(initialXAttribute);
  const xValue = d => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);

  const initialYAttribute = 'sepal_width';
  const [yAttribute, setSelectedYAttribute] = useState(initialYAttribute);
  const yValue = d => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);

  if (!data) {
    return <div>Loading...</div>;
  }
  console.log(data);

  const xScale = scaleLinear().
    domain(extent(data, xValue)).
    range([0, innerWidth]).
    nice();

  const yScale = scaleLinear().
    domain(extent(data, yValue)).
    range([innerHeight, 0]).
    nice();

  return (
    <>
      <div className="menus-container" width={width} height={menuHeight}>
        <span className="dropdown-label">X</span>
        <ReactDropdown
          options={options}
          value={initialXAttribute}
          onChange={option => setSelectedXAttribute(option.value)}
        />
        <span className="dropdown-label">Y</span>
        <ReactDropdown
          options={options}
          value={initialYAttribute}
          onChange={option => setSelectedYAttribute(option.value)}
        />
      </div>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={tickFormat} />
          <AxisLeft
            yScale={yScale}
            innerWidth={innerWidth}
            tickFormat={tickFormat} />
          <Marks
            data={data}
            xValue={xValue}
            yValue={yValue}
            xScale={xScale}
            yScale={yScale}
            circleRadius={10}
            tickFormat={tickFormat}
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
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);