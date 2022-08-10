import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, arc, pie, scaleBand, scaleLinear, max } from 'd3';

const csvUrl = "https://gist.githubusercontent.com/tjcocucci/30c990a48c1b6aecfe8ac8676012c029/raw/a3d244187db572dc9a0411c8b14c6118a1bf85ce/un_pop.csv";

const width = 960;
const height = 300;
const margin = { top: 50, right: 50, left: 250, bottom: 50 };
const innerWidth = width - margin.right - margin.left
const innerHeight = height - margin.top - margin.bottom

const App = () => {
  const [data, setData] = useState(null);

  const row = d => {
    return { country: d["Country"], population: +d["2020"] }
  };
  useEffect(() => {
    csv(csvUrl, row).then(d => {
      const slicedData = d.slice(0, 10);
      slicedData.columns = Object.keys(slicedData[0]);
      setData(slicedData);
    });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const xScale = scaleLinear().
    domain([0, max(data, d => d.population)]).
    range([0, innerWidth]);

  const yScale = scaleBand().
    domain(data.map(d => d.country)).
    range([0, innerHeight]);

  // console.log(data[0]);
  // console.log(data.columns);
  console.log(xScale.ticks());

  data.map(d => console.log(d));

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {xScale.ticks().map(tick => (
          <g key={tick} transform={`translate(${xScale(tick)}, 0)`}>
            <line y2={innerHeight} stroke="black"></line>
            <text
              y={innerHeight + 3}
              dy="0.71em"
              text-anchor="middle"
            >{tick}</text>
          </g>
        ))}
        {yScale.domain().map(label => (
          <text
            key={label}
            x={-3}
            y={yScale(label) + yScale.bandwidth() / 2}
            dy="0.32em"
            text-anchor="end"
          >{label}</text>
        ))}
        {data.map(d => (
          <rect
            key={d.country}
            y={yScale(d.country)}
            height={yScale.bandwidth()}
            width={xScale(d.population)}
          />
        ))}
      </g>
    </svg>
  );
};


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);