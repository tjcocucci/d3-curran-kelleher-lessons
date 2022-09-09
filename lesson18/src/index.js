import React from 'react';
import ReactDOM from 'react-dom';
import { geoEqualEarth, scaleSqrt, max } from 'd3';
import { WorldAtlas } from './WorldAtlas.js';
import { Marks } from './Marks.js';
import { useCities } from './useCities.js';
import { useWorldAtlas } from './useWorldAtlas.js';

const width = 960;
const height = 600;
const margin = { top: 0, right: 0, left: 0, bottom: 0 };
// const innerWidth = width - margin.right - margin.left
// const innerHeight = height - margin.top - margin.bottom

const projection = geoEqualEarth();

const xValue = (d) => d.lng;
const yValue = (d) => d.lat;
const sizeValue = (d) => d.population;

// const circleRadius = 1;
const maxRadius = 25;

const App = () => {
  const cities = useCities();
  const worldAtlasData = useWorldAtlas();

  if (!cities || !worldAtlasData) {
    return <div>Loading...</div>;
  }

  const sizeScale = scaleSqrt()
    .domain([0, max(cities, sizeValue)])
    .range([0, maxRadius]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <WorldAtlas data={worldAtlasData} projection={projection} />
        <Marks
          projection={projection}
          cities={cities}
          xValue={xValue}
          yValue={yValue}
          sizeScale={sizeScale}
          sizeValue={sizeValue}
        />
      </g>
    </svg>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
