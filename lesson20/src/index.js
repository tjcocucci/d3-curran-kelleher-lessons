import React from 'react';
import ReactDOM from 'react-dom';
import { geoEqualEarth, scaleSqrt, max } from 'd3';
import { WorldAtlas } from './WorldAtlas.js';
import { Marks } from './Marks.js';
import { useData } from './useData.js';
import { useWorldAtlas } from './useWorldAtlas.js';

const width = 960;
const height = 600;
const margin = { top: 0, right: 0, left: 0, bottom: 0 };

const projection = geoEqualEarth();

const xValue = (d) => d.longitude;
const yValue = (d) => d.latitude;
const sizeValue = (d) => d.total;

const maxRadius = 25;

const App = () => {
  const data = useData();
  const worldAtlasData = useWorldAtlas();

  if (!data || !worldAtlasData) {
    return <div>Loading...</div>;
  
  }

  const sizeScale = scaleSqrt()
    .domain([0, max(data, sizeValue)])
    .range([0, maxRadius]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <WorldAtlas data={worldAtlasData} projection={projection} />
        <Marks
          projection={projection}
          data={data}
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
