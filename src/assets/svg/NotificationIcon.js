import * as React from "react"
import Svg, { Path } from "react-native-svg"
const NotificationIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={20}
    fill="none"
    stroke="#1E1E1E"
    {...props}
  >
    <Path
      strokeMiterlimit={10}
      d="M13 4.431H4.431A3.422 3.422 0 0 0 1 7.853V13a3.431 3.431 0 0 0 3.431 3.431h1.716L8.716 19l2.613-2.569h1.716A3.431 3.431 0 0 0 16.476 13V7.853A3.422 3.422 0 0 0 13 4.431Z"
    />
    <Path
      strokeMiterlimit={10}
      d="M16.431 13a3.43 3.43 0 0 0 3.431-3.45V4.432A3.431 3.431 0 0 0 16.431 1H7.862a3.431 3.431 0 0 0-3.431 3.431M4.431 10.431h1.716M7.862 10.431h1.716M11.284 10.431H13"
    />
  </Svg>
)
export default NotificationIcon
