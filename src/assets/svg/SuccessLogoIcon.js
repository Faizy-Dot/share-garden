import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SuccessLogoIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={122}
    height={122}
    fill="none"
    {...props}
  >
    <Path
      stroke="#009D89"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M120 55.606v5.428a58.998 58.998 0 0 1-42.271 56.545 59.004 59.004 0 0 1-66.224-24.467A59 59 0 0 1 85.013 7.108"
    />
    <Path
      stroke="#009D89"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M120 13.834 61 72.893l-17.7-17.7"
    />
  </Svg>
)
export default SuccessLogoIcon;
