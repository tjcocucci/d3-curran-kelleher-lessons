export const ColorLegend = ({
  colorScale,
  onHover,
  hoveredValue,
  fadeOpacity,
  circleRadius = 10,
  legendYOffset = 22
}) =>
  colorScale.domain().map((domainValue, i) => (
    <g
      className="tick"
      transform={`translate(0, ${i * legendYOffset})`}
      onMouseEnter={() => onHover(domainValue)}
      onMouseOut={() => onHover(null)}

    >
      <g opacity={!hoveredValue || domainValue === hoveredValue ? 1 : fadeOpacity}>
        <circle
          fill={colorScale(domainValue)}
          r={circleRadius}
        >
        </circle>
        <text dy="0.32em" dx={circleRadius * 1.5}>{domainValue}</text>

      </g>
    </g>
  ))
