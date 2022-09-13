import React, { useRef, useEffect } from "react";
import {
  scaleLinear,
  scaleTime,
  extent,
  timeFormat,
  max,
  sum,
  brushX,
  select,
  event,
  histogram as bin,
} from "d3";
import { AxisBottom } from "./AxisBottom.js";
import { AxisLeft } from "./AxisLeft.js";
import { Marks } from "./Marks.js";

export const DateHistogram = ({
  data,
  innerWidth,
  innerHeight,
  setBrushExtent,
}) => {
  const circleRadius = 3;

  const yTickFormat = d3.format("d");
  const xTickFormat = timeFormat("%Y");

  const xValue = (d) => d.date;
  const xAxisLabel = "Date";

  const yValue = (d) => d.total;
  const yAxisLabel = "Dead or missing";

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const [start, stop] = xScale.domain();

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(d3.timeMonths(start, stop))(data)
    .map((array) => ({
      y: sum(array, yValue),
      x0: array.x0,
      x1: array.x1,
    }));

  const yScale = scaleLinear()
    .domain([0, max(binnedData, (b) => b.y)])
    .range([innerHeight, 0])
    .nice();

  const brushRef = useRef();

  useEffect(() => {
    const brush = brushX().extent([
      [0, 0],
      [innerWidth, innerHeight],
    ]);
    brush(select(brushRef.current));
    brush.on("brush end", () =>
      setBrushExtent(
        event.selection ? event.selection.map(xScale.invert) : null
      )
    );
  }, [innerWidth, innerHeight]);

  return (
    <>
      <rect height={innerHeight} width={innerWidth} fill="white"></rect>
      <AxisBottom
        xScale={xScale}
        innerHeight={innerHeight}
        tickFormat={xTickFormat}
      />
      <AxisLeft
        yScale={yScale}
        innerWidth={innerWidth}
        tickFormat={yTickFormat}
      />
      <Marks
        data={binnedData}
        yScale={yScale}
        xScale={xScale}
        xValue={xValue}
        yValue={yValue}
        innerHeight={innerHeight}
        circleRadius={circleRadius}
      />
      <text
        className="axis-label"
        x={innerWidth / 2}
        y={innerHeight}
        dy={50}
        textAnchor="middle"
      >
        {xAxisLabel}
      </text>
      <text
        transform={`translate(0, ${innerHeight / 2}) rotate(-90)`}
        className="axis-label"
        dy={-50}
        textAnchor="middle"
      >
        {yAxisLabel}
      </text>
      <g ref={brushRef}></g>
    </>
  );
};
