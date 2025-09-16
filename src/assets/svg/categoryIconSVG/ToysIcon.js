import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ToysIcon = ({ color = "#000", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.7 12.037c-1.6-1.1-2.7-2.9-2.7-5 0-3.5 3.1-6.4 6.7-6 2.6.3 4.8 2.4 5.2 5.1.4 2.7-1 5-3.1 6.2 2.6.8 4.5 3.4 4.1 6.4-.3 3.1-3.1 5.3-6.2 5.3H8c-3.3 0-6-2-7-6v-8l.8.6c2.1 1.6 4.6 2.4 7.2 2.4M16 5.037v3"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19.2 10.037c1.8-.1 3.5-.9 4.6-2.4l1.2-1.6h-5M15 18.037c0 1.7-1.3 3-3 3-4 0-5-3-5-3s3.3-3 5-3c1.7 0 3 1.3 3 3Z"
    />
  </Svg>
)
export default ToysIcon;
