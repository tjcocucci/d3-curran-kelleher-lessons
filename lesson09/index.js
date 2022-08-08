import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, arc, pie, scaleBand, scaleLinear, max } from 'd3';

const csvUrl = "https://gist.githubusercontent.com/tjcocucci/30c990a48c1b6aecfe8ac8676012c029/raw/a3d244187db572dc9a0411c8b14c6118a1bf85ce/un_pop.csv";

const width = 960;
const height = 500;

const App = () => {
  const [data, setData] = useState(null);

  const row = d => {
    return { country: d["Country"], population: +d["2020"] }
  };
  useEffect(() => {
    csv(csvUrl, row).then(d => {
      const slicedData = d.slice(0, 20);
      slicedData.columns = Object.keys(slicedData[0]);
      setData(slicedData);
    });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const xScale = scaleLinear().
    domain([0, max(data, d => d.population)]).
    range([0, width]);

  const yScale = scaleBand().
    domain(data.map(d => d.country)).
    range([0, height]);

  // console.log(data[0]);
  // console.log(data.columns);

  data.map(d => console.log(d));

  return (
    <svg width={width} height={height}>
      {data.map(d => (
        <rect
          x={0}
          y={yScale(d.country)}
          height={yScale.bandwidth()}
          width={xScale(d.population)}
        />
      ))}
    </svg>
  );
};


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);