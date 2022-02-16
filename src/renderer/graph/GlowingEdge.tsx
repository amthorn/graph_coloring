export const GlowingEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
  data = {strokeWidth: 1}
}) => (
  <path
    id={ id }
    style={ {...style, strokeWidth: data.strokeWidth} }
    className="react-flow__edge-path"
    markerEnd="none"
    d={ `M ${sourceX},${sourceY}L ${targetX},${targetY}` }
  />
);
