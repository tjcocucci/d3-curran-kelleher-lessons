import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { message } from './message';
import { csv } from 'd3';

const csvUrl = "https://gist.githubusercontent.com/tjcocucci/d890b6b864020ab77a79699079a29b5c/raw/cssNamedColors.csv";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {csv(csvUrl).then(setData)}, []);

  // csv(csvUrl).then(setData);
  // This is a clunkier version
  // csv(csvUrl).then( data => {
  //   console.log('Fetching data...');
  //   setData(data);
  // });

  return (
    <div>{data ? 'Data: \n' + message(data) : 'Loading...'}</div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);