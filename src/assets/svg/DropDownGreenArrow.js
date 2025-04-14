import * as React from "react"
import Svg, { Path } from "react-native-svg"
const DropDownGreenArrow = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={7}
    fill="none"
    {...props}
  >
    <Path
      fill="#009D89"
      d="M9.76 0H1.24C.209 0-.37 1.056.268 1.775l4.26 4.806c.495.559 1.45.559 1.947 0l4.26-4.807C11.372 1.056 10.793 0 9.76 0Z"
    />
  </Svg>
)
export default DropDownGreenArrow;

