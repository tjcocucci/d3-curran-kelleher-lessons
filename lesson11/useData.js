import React, { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl = "https://gist.githubusercontent.com/tjcocucci/30c990a48c1b6aecfe8ac8676012c029/raw/a3d244187db572dc9a0411c8b14c6118a1bf85ce/un_pop.csv";

export const useData = () => {
  const [data, setData] = useState(null);
  const row = d => {
    return { country: d["Country"], population: +d["2020"] * 1000 };
  };

  useEffect(() => {
    csv(csvUrl, row).then(d => {
      const slicedData = d.slice(0, 10);
      slicedData.columns = Object.keys(slicedData[0]);
      setData(slicedData);
    });
  }, []);

  return data;
};
