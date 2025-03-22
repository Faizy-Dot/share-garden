import * as React from "react"
import Svg, { Path } from "react-native-svg"
import colors from "../../config/Colors";
const TimeIcon = ({stroke = colors.buttonColor ,...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={19}
    fill="none"
    {...props}
    viewBox="0 0 18 19"
  >
    <Path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.25 17.936c4.418 0 8-3.905 8-8.721 0-4.817-3.582-8.721-8-8.721-4.419 0-8 3.904-8 8.72 0 4.817 3.581 8.722 8 8.722ZM9.25 3.435v5.779M13.008 13.312 9.25 9.215"
    />
  </Svg>
)
export default TimeIcon;
