import { useState, useEffect } from "react";
import { csv } from "d3";

const csvUrl =
  "https://gist.githubusercontent.com/tjcocucci/9ca4db94ab3b5d75c8a412837313dfb0/raw/missing_migrants.csv";

export const useData = () => {
  const [data, setData] = useState(null);
  const row = (d) => {
    d.date = new Date(d.date);
    d.dead = +d.dead;
    d.missing = +d.missing;
    d.latitude = +d.latitude;
    d.longitude = +d.longitude;
    d.total = +d.missing + d.dead;
    return d;
  };

  useEffect(() => {
    csv(csvUrl, row).then(setData);
  }, []);

  return data;
};
