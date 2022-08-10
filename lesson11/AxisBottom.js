export const AxisBottom = ({ xScale, innerHeight }) =>
  xScale.ticks().map(tick => (
    <g key={tick} transform={`translate(${xScale(tick)}, 0)`}>
      <line y2={innerHeight} stroke="black"></line>
      <text
        y={innerHeight + 3}
        dy="0.71em"
        textAnchor="middle"
      >{tick}</text>
    </g>
  ))
