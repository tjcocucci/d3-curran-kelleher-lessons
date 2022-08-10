export const AxisLeft = ({yScale}) =>
  yScale.domain().map(label => (
    <text
      key={label}
      x={-3}
      y={yScale(label) + yScale.bandwidth() / 2}
      dy="0.32em"
      text-anchor="end"
    >{label}</text>
  ))
