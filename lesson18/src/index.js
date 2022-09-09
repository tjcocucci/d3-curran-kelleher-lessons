import React from 'react';
import ReactDOM from 'react-dom';
import { WorldAtlas } from './WorldAtlas.js';
import { Marks } from './Marks.js';
import { useCities } from './useCities.js';
import { useWorldAtlas } from './useWorldAtlas.js';
import { scaleLinear } from 'd3';

const width = 960;
const height = 600;
const margin = { top: 0, right: 0, left: 0, bottom: 0 };
// const innerWidth = width - margin.right - margin.left
// const innerHeight = height - margin.top - margin.bottom

const xValue = (d) => d.lng;
const yValue = (d) => d.lat;

const xScale = scaleLinear().domain([0, 360]).range([0, innerWidth]).nice();

const yScale = scaleLinear().domain([-90, 90]).range([innerHeight, 0]).nice();

const circleRadius = 5;

const App = () => {
  const cities = useCities();
  const worldAtlasData = useWorldAtlas();

  if (!cities || !worldAtlasData) {
    return <div>Loading...</div>;
  }

  console.log(cities);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <WorldAtlas data={worldAtlasData} />
        <Marks
          data={cities}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          circleRadius={circleRadius}
        />
      </g>
    </svg>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
