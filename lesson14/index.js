import React from 'react';
import ReactDOM from 'react-dom';
import { Marks } from './Marks.js';
import { useData } from './useData';

const width = 960;
const height = 600;
const margin = { top: 0, right: 0, left: 0, bottom: 0 };
// const innerWidth = width - margin.right - margin.left
// const innerHeight = height - margin.top - margin.bottom

const App = () => {

  const data = useData();

  if (!data) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <Marks data={data} />
      </g>
    </svg>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);