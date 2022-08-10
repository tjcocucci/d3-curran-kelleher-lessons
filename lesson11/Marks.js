export const Marks = ({ data, yScale, xScale, xValue, yValue, tickFormat }) =>
  data.map(d => (
    <rect
      className="mark"
      key={yValue(d)}
      y={yScale(yValue(d))}
      height={yScale.bandwidth()}
      width={xScale(xValue(d))}
    >
      <title>
        {tickFormat(xValue(d))}
      </title>
    </rect>
  ))
