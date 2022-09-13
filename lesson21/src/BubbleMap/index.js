import { scaleSqrt, max } from 'd3';
import { WorldAtlas } from './WorldAtlas.js';
import { Marks } from './Marks.js';

export const BubbleMap = ({ data, worldAtlasData, projection }) => {
  const maxRadius = 25;
  const sizeValue = (d) => d.total;

  const xValue = (d) => d.longitude;
  const yValue = (d) => d.latitude;

  const sizeScale = scaleSqrt()
    .domain([0, max(data, sizeValue)])
    .range([0, maxRadius]);

  return (
    <>
      <WorldAtlas data={worldAtlasData} projection={projection} />
      <Marks
        projection={projection}
        data={data}
        xValue={xValue}
        yValue={yValue}
        sizeScale={sizeScale}
        sizeValue={sizeValue}
      />
    </>
  );
};
