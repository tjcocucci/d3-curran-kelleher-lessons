export const Marks = ({ data, yScale, xScale, xValue, yValue }) =>
  data.map(d => (
    <rect
      key={yValue(d)}
      y={yScale(yValue(d))}
      height={yScale.bandwidth()}
      width={xScale(xValue(d))}
    />
  ))
