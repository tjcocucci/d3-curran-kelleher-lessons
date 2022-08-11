import { line, curveNatural } from 'd3';

export const Marks = ({ data, yScale, xScale, xValue, yValue, circleRadius }) => (
  <g className="mark">
    <path
      d={line().
        x(d => xScale(xValue(d))).
        y(d => yScale(yValue(d))).
        curve(curveNatural)(data)}
    >
    </path>
    {data.map(d => (
      <circle
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={circleRadius}
      >
      </circle>
    ))}
  </g>
)
