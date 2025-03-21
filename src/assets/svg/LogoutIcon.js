import * as React from "react"
import Svg, { Path } from "react-native-svg"
const LogoutIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 11.323h-9.032M17.774 14.548l3.187-3.445a.154.154 0 0 0 0-.206l-3.187-3.445M15.194 3.222v-.555c0-.92-.734-1.667-1.638-1.667H3.184C1.978 1 1 1.995 1 3.222v15.556C1 20.005 1.978 21 3.184 21h10.372c.904 0 1.638-.746 1.638-1.667v-.555"
    />
  </Svg>
)
export default LogoutIcon;
