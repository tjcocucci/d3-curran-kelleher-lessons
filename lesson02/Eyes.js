export const Eyes = ({ eyeRadius, eyeOffsetX, eyeOffsetY}) => (
  <>
    <circle 
      r={eyeRadius}
      cx={-eyeOffsetX}
      cy={-eyeOffsetY}
    />
    <circle 
      r={eyeRadius}
      cx={+eyeOffsetX}
      cy={-eyeOffsetY}
    />
  </>
);

