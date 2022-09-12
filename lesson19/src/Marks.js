export const Marks = ({ data, yScale, xScale }) =>
  data.map(bin => (
    <rect
      className="mark"
      x={xScale(bin.x0)}
      y={yScale(bin.y)}
      height={yScale.range()[0] - yScale.range()[1] - yScale(bin.y)}
      width={xScale(bin.x1) - xScale(bin.x0)}
    > <title>{bin.y}</title>
    </rect>
  ))
