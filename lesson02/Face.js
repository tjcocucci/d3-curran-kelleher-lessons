import { BackgroundCircle } from './BackgroundCircle';
import { Eyes } from './Eyes';
import { Mouth } from './Mouth';
import { FaceContainer } from './FaceContainer';

export const Face = ({
  width,
  height,
  centerX,
  centerY,
  faceRadius,
  strokeWidth,
  offsetX,
  offsetY,
  eyeRadius,
  mouthRadius,
  mouthWidth
}) => (
  <FaceContainer
    width={width}
    height={height}
    centerX={centerX}
    centerY={centerY}
  >
    <BackgroundCircle
      faceRadius={faceRadius}
      strokeWidth={strokeWidth}
    ></BackgroundCircle>
    <Eyes
      offsetX={offsetX}
      offsetY={offsetY}
      eyeRadius={eyeRadius}
    ></Eyes>
    <Mouth
      mouthRadius={mouthRadius}
      mouthWidth={mouthWidth}
    >
    </Mouth>
  </FaceContainer>
);
