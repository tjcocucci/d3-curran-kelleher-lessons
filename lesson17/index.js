import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { scaleLinear, scaleOrdinal, extent } from 'd3';
import { AxisBottom } from './AxisBottom.js';
import { AxisLeft } from './AxisLeft.js';
import { Marks } from './Marks.js';
import { ColorLegend } from './ColorLegend.js';
import { useData } from './useData';
import ReactDropdown from 'react-dropdown';

const width = 960;
const menuHeight = 80;
const height = 500 - menuHeight;
const margin = { top: 20, right: 200, bottom: 65, left: 90 };
const innerWidth = width - margin.right - margin.left
const innerHeight = height - margin.top - margin.bottom

const circleRadius = 5;
const fadeOpacity = 0.2

const tickFormat = tickValue => d3.format('.1f')(tickValue);

const options = [
  { value: "sepal_length", label: "Sepal Length" },
  { value: "sepal_width", label: "Sepal Width" },
  { value: "petal_length", label: "Petal Length" },
  { value: "petal_width", label: "Petal Width" }
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

  const [hoveredValue, setHoveredValue] = useState(null);
  console.log(xAttribute, yAttribute, hoveredValue);

  const colorValue = d => d.species;
  const colorAxisLabel = 'Species';

  if (!data) {
    return <div>Loading...</div>;
  }

  const hoveredData = data.filter(d => d.species === hoveredValue);
  console.log(hoveredData);

  const xScale = scaleLinear().
    domain(extent(data, xValue)).
    range([0, innerWidth]).
    nice();

  const yScale = scaleLinear().
    domain(extent(data, yValue)).
    range([innerHeight, 0]).
    nice();

  const colorScale = scaleOrdinal().
    domain(data.map(d => d.species)).
    range(['#E6842A', '#137B80', '#8E6C8A']);

  return (
    <>
      <div className="menus-container" width={width} height={menuHeight}>
        <span className="dropdown-label">X</span>
        <ReactDropdown
          options={options}
          value={xAttribute}
          onChange={option => setSelectedXAttribute(option.value)}
        />
        <span className="dropdown-label">Y</span>
        <ReactDropdown
          options={options}
          value={yAttribute}
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
          <g opacity={hoveredValue ? fadeOpacity : 1}>
            <Marks
              data={data}
              xValue={xValue}
              yValue={yValue}
              colorValue={colorValue}
              xScale={xScale}
              yScale={yScale}
              colorScale={colorScale}
              circleRadius={circleRadius}
              tickFormat={tickFormat}
            />
          </g>
          <Marks
            data={hoveredData}
            xValue={xValue}
            yValue={yValue}
            colorValue={colorValue}
            xScale={xScale}
            yScale={yScale}
            colorScale={colorScale}
            circleRadius={circleRadius}
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
          <g transform={`translate(${innerWidth + 50}, 60)`}>
            <text
              x={-40}
              y={-30}
              className="axis-label"
            >{colorAxisLabel}</text>
            <ColorLegend
              onHover={setHoveredValue}
              onOut={setHoveredValue}
              circleRadius={circleRadius}
              colorScale={colorScale}
              hoveredValue={hoveredValue}
              fadeOpacity={fadeOpacity}
            />
          </g>
        </g>
      </svg>
    </>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);