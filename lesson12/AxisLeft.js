export const AxisLeft = ({ yScale, innerWidth, tickFormat }) =>
yScale.ticks().map(tick => (
  <g className="tick" key={tick} transform={`translate(0, ${yScale(tick)})`}>
    <line x2={innerWidth} stroke="black"></line>
    <text
      x={- 3}
      dy="0.32em"
      textAnchor="end"
    >{tickFormat(tick)}</text>
  </g>
))
