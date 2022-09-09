import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl =
  'https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/worldcities_clean.csv';

export const useCities = () => {
  const [citiesData, setCities] = useState(null);
  const row = (d) => ({
    city: d.city,
    lat: +d.lat,
    lng: +d.lng,
    country: d.country,
    population: d.population,
  });

  useEffect(() => {
    csv(csvUrl, row).then(setCities);
  }, []);
  console.log(citiesData);
  return citiesData;
};
