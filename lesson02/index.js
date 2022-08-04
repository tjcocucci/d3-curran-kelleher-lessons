import React from 'react';
import ReactDOM from 'react-dom';
import { Face } from './Face';

const width = 200;
const height = 200;
const faceRadius = 90;

const App = () => (
  <Face
    width={200}
    height={200}
    centerX={width / 2}
    centerY={height / 2}
    faceRadius={90}
    eyeRadius={10}
    offsetX={faceRadius / 3}
    offsetY={faceRadius / 3}
    strokeWidth={10}
    mouthRadius={faceRadius * 2 / 3}
    mouthWidth={10}
  />
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);