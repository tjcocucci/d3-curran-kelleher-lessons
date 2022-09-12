import { useState, useEffect } from "react";
import { csv } from "d3";

const csvUrl =
  "https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv";

export const useData = () => {
  const [data, setData] = useState(null);
  const row = (d) => {
    const [lat, long] = d["Location Coordinates"]
    d.date = new Date(d["Reported Date"]);
    d.latitude = +lat;
    d.longitude = +long;
    d.total = +d["Total Dead and Missing"];
    return d;
  };

  useEffect(() => {
    csv(csvUrl, row).then(setData);
  }, []);

  return data;
};
