import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"
const OthersIcon = ({ color = "#000", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeWidth={2}
      d="m18.073 6.779-.264 11.843M3.603 6.779l-.264 11.843"
    />
    <Circle
      cx={17.916}
      cy={3.467}
      r={2.077}
      stroke={color}
      strokeWidth={2}
      transform="rotate(91.277 17.916 3.467)"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeWidth={2}
      d="M10.529 13.844 10.793 2"
    />
    <Circle
      cx={3.446}
      cy={3.467}
      r={2.077}
      stroke={color}
      strokeWidth={2}
      transform="rotate(91.277 3.446 3.467)"
    />
    <Circle
      cx={10.686}
      cy={17.156}
      r={2.077}
      stroke={color}
      strokeWidth={2}
      transform="rotate(-88.723 10.686 17.156)"
    />
  </Svg>
)
export default OthersIcon;
