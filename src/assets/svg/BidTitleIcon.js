import * as React from "react"
import Svg, { Path } from "react-native-svg"
const BidTitleIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6.867 5.133 11 1M8.2 1H11v2.8"
    />
    <Path
      stroke="#009D89"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 7.111V9.89C11 10.503 10.502 11 9.889 11H2.11A1.111 1.111 0 0 1 1 9.889V2.11C1 1.497 1.497 1 2.111 1H4.89"
    />
  </Svg>
)
export default BidTitleIcon;
