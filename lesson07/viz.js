import vl from 'vega-lite-api';
export const viz = vl
  .markCircle({ size: 300, opacity: 0.5 })
  .encode(
    vl.x().fieldT('year').scale({ zero: false }),
    vl.y().fieldQ('horsepower').scale({ zero: false }),
    vl.color().fieldN('origin'),
    vl.size().fieldQ('weight'),
    vl.tooltip().fieldN('name')
  );