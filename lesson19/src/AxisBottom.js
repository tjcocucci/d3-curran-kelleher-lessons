export const AxisBottom = ({ xScale, innerHeight, tickFormat }) =>
  xScale.ticks().map((tick) => (
    <g className="tick" key={tick} transform={`translate(${xScale(tick)}, 0)`}>
      <line y2={innerHeight} stroke="black"></line>
      <text y={innerHeight + 3} dy="0.71em" textAnchor="middle">
        {tickFormat(tick)}
      </text>
    </g>
  ));
