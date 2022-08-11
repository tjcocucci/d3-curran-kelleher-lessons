import React, { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl = "https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/week_temperature_sf.csv";

export const useData = () => {
  const [data, setData] = useState(null);
  const row = d => {
    d.timestamp = new Date(d.timestamp);
    d.temperature = +d.temperature;
    return d;
  };

  useEffect(() => {csv(csvUrl, row).then(setData)}, []);

  return data;
};
