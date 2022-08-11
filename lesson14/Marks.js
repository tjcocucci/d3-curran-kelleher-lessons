import { geoEqualEarth, geoPath, geoGraticule } from 'd3';

const projection = geoEqualEarth();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({ data }) => (
  <g className="marks">
    <path className="background" d={path({ type: "Sphere" })}></path>
    <path className="graticules" d={path(graticule())}></path>
    <path className="land" d={path(data.land)}></path>
    {/* {data.countries.features.map(country => (
      <path className="countries" d={path(country)}></path>
    ))} */}
    <path className="interiors" d={path(data.interiors)}></path>
  </g>
)
