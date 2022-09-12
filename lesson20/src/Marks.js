export const Marks = ({
  cities,
  projection,
  xValue,
  yValue,
  sizeScale,
  sizeValue,
}) => {
  const circles = cities.map((d) => {
    const [x, y] = projection([xValue(d), yValue(d)]);
    return { x: x, y: y, size: sizeScale(sizeValue(d)) };
  });
  return circles.map((c) => (
    <circle className="city" cx={c.x} cy={c.y} r={c.size}></circle>
  ));
};
