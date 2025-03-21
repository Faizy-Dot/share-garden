import * as React from "react"
import Svg, { Path } from "react-native-svg"
const RightArrowIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#1E1E1E"
      d="M1.65.002a1.66 1.66 0 0 1 1.165.473L10.517 8c.31.303.483.712.483 1.14 0 .427-.174.837-.483 1.14l-7.702 7.46a1.68 1.68 0 0 1-2.03-.18 1.582 1.582 0 0 1-.302-1.97l6.601-6.45L.483 2.69A1.594 1.594 0 0 1 0 1.55C0 1.122.174.713.483.41A1.651 1.651 0 0 1 1.649.002Z"
    />
  </Svg>
)
export default RightArrowIcon;
