import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, arc, pie, scaleBand, scaleLinear, max } from 'd3';

const csvUrl = "https://gist.githubusercontent.com/tjcocucci/30c990a48c1b6aecfe8ac8676012c029/raw/a3d244187db572dc9a0411c8b14c6118a1bf85ce/un_pop.csv";

const width = 960;
const height = 500;


const App = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const row = d => {
      d.Population = +d['2020'];
      return d;
    };
    csv(csvUrl, row).then(data => setData(data.slice(0, 10)));
  }, []);
  
  if (!data) {
    return (
      <div>Loading...</div>
      );
    }
    
  console.log(data[0]);
  // data.map(d => console.log(d));
  const yScale = scaleBand()
    .domain(data.map(d => d.Country))
    .range([0, height]);

  const xScale = scaleLinear()
    .domain([0, max(data, d => d.Population)])
    .range([0, width]);

  return (
    <svg width={width} height={height}>
      {data.map(d => ( 
        <rect
          x={0}
          y={yScale(d.Country)}
          width={xScale(d.Population)}
          height={yScale.bandwidth()}
        />
      ))}
    </svg>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);