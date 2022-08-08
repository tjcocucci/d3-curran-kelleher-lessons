import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, arc, pie } from 'd3';

const csvUrl = "https://gist.githubusercontent.com/tjcocucci/d890b6b864020ab77a79699079a29b5c/raw/cssNamedColors.csv";

const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

const pieArc = arc()
  .innerRadius(0)
  .outerRadius(width);

const colorPie = pie().value(1);

const App = () => {
  const [data, setData] = useState(null);
      
  useEffect(() => {csv(csvUrl).then(setData)}, []);

  if (!data) {
    return (
      <div>Loading...</div>
      );
  }

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        {
          colorPie(data).map(d => (
            <path 
              fill={d.data['RGB hex value']}
              d={pieArc(d)}
            />
          ))
          // data.map((d, i) => 
          //   <path 
          //     fill={d['RGB hex value']}
          //     d={pieArc({
          //       innerRadius: 0, 
          //       outerRadius: width, 
          //       startAngle: i/data.length*2*Math.PI, 
          //       endAngle: (i+1)/data.length*2*Math.PI
          //     })}
          //   />
          // )
        }
      </g>
    </svg>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);