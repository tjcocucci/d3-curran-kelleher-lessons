import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';

const width = 960;
const height = 500;
const radius = 10;
const initialMousePosition = {x: width / 2, y: height / 2};


const App = () => {
  const [mousePosition, setMousePosition] = useState(initialMousePosition);
  const handleMouseMove = useCallback((event) => {
    const { clientX, clientY } = event;
    setMousePosition({x: clientX, y: clientY});
  }, [setMousePosition]);
  return (
    <svg width={width} height={height} onMouseMove={handleMouseMove}>
      <circle
        r={radius}
        cx={mousePosition.x}
        cy={mousePosition.y}
      />
    </svg>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);