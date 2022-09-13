import { geoPath, geoGraticule } from 'd3';

export const WorldAtlas = ({ data, projection }) => {
  const path = geoPath(projection);
  const graticule = geoGraticule();
  return (
    <g className="marks">
      <path className="background" d={path({ type: 'Sphere' })}></path>
      <path className="graticules" d={path(graticule())}></path>
      <path className="land" d={path(data.land)}></path>
      <path className="interiors" d={path(data.interiors)}></path>
    </g>
  );
};
