import * as React from "react"
import Svg, { Path } from "react-native-svg"
const DownArrowIcon = ({stroke = "#000",...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={12}
    fill="none"
    {...props}
  >
    <Path
      fill={stroke}
      d="M18.498 2.15a1.659 1.659 0 0 1-.473 1.165L10.5 11.017c-.303.31-.712.483-1.14.483-.427 0-.837-.174-1.14-.483L.76 3.315a1.68 1.68 0 0 1 .18-2.03A1.582 1.582 0 0 1 2.91.983l6.45 6.601L15.81.983c.303-.31.713-.483 1.14-.483.428 0 .838.174 1.14.483.28.318.428.737.408 1.166Z"
    />
  </Svg>
)
export default DownArrowIcon;
