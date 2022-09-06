import React, { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl = "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/iris.csv";

export const useData = () => {
  const [data, setData] = useState(null);
  const row = d => {
    d.sepal_length = +d.sepal_length;
    d.sepal_width = +d.sepal_width;
    d.petal_length = +d.petal_length;
    d.petal_width = +d.petal_width;
    d.species = d.species;
    return d;
  };

  useEffect(() => {csv(csvUrl, row).then(setData)}, []);

  return data;
};
