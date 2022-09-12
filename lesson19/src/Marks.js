export const Marks = ({ data, yScale, xScale, separation = 0.5}) =>
  data.map(bin => (
    <rect
      className="mark"
      x={xScale(bin.x0) + separation}
      y={yScale(bin.y)}
      height={yScale.range()[0] - yScale.range()[1] - yScale(bin.y)}
      width={xScale(bin.x1) - xScale(bin.x0) - 2*separation}
    > <title>{bin.y}</title>
    </rect>
  ))
