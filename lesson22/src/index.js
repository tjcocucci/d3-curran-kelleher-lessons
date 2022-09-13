import React, { useState } from "react";
import ReactDOM from "react-dom";
import { geoEqualEarth } from "d3";
import { useData } from "./useData.js";
import { useWorldAtlas } from "./BubbleMap/useWorldAtlas.js";
import { BubbleMap } from "./BubbleMap/index.js";
import { DateHistogram } from "./DateHistogram/index.js";

const margin = { top: 50, right: 50, left: 50, bottom: 50 };

const width = 960 + margin.left + margin.right;
const height = 500 + margin.top + margin.bottom;

const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

const histogramHeight = innerHeight - 400;
const dateHistogramMargin = 50;

const projection = geoEqualEarth();

const App = () => {
  const data = useData();
  const worldAtlasData = useWorldAtlas();

  const [brushExtent, setBrushExtent] = useState(null);

  if (!data || !worldAtlasData) {
    return <div>Loading...</div>;
  }

  const filteredData = data.filter(
    (d) => !brushExtent || (d.date > brushExtent[0] && d.date < brushExtent[1])
  );

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <BubbleMap
          data={filteredData}
          worldAtlasData={worldAtlasData}
          projection={projection}
        />
        <g
          transform={`translate(${dateHistogramMargin}, ${
            innerHeight - histogramHeight
          })`}
        >
          <DateHistogram
            data={data}
            innerWidth={innerWidth - dateHistogramMargin}
            innerHeight={histogramHeight}
            setBrushExtent={setBrushExtent}
          />
        </g>
      </g>
    </svg>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
