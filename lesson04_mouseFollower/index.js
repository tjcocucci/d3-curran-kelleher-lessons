import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';

const radius = 10;
const width = 200;
const height = 200;
const initialMousePosition = {x: width / 2, y: height / 2};

const App = () => {
  const [mousePosition, setMousePosition] = useState(initialMousePosition);
  const handleMouseMove = useCallback(({ clientX, clientY }) => {
    setMousePosition({x: clientX, y: clientY});
  }, [setMousePosition]);
  console.log(mousePosition.x, mousePosition.y);
  return (
    <svg width={width} height={height} onMouseMove={handleMouseMove}>
      <circle cx={mousePosition.x} cy={mousePosition.y} r={radius}></circle>
    </svg>
)};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
