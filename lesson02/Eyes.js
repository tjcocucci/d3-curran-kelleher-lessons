export const Eyes = ({ offsetX, offsetY, eyeRadius }) => (
  <>
    <circle
      cx={-offsetX}
      cy={-offsetY}
      r={eyeRadius}
      fill="black"
    >
    </circle>
    <circle
      cx={offsetX}
      cy={-offsetY}
      r={eyeRadius}
      fill="black"
    >
    </circle>
  </>
);
