import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ModalInfoIcon = ({IstrokeColor ="#F8443E",outerStroke = "#1E1E1E" ,...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    fill="none"
    {...props}
  >
    <Path
      stroke={outerStroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.5 24.469c.841.708 2.198.708 3.014 0l1.898-1.621c.36-.3 1.044-.553 1.525-.553h2.04a2.327 2.327 0 0 0 2.318-2.317v-2.041c0-.48.252-1.153.553-1.513l1.62-1.897c.71-.841.71-2.198 0-3.014l-1.62-1.898c-.3-.36-.553-1.032-.553-1.513v-2.04a2.327 2.327 0 0 0-2.317-2.318h-2.041c-.48 0-1.153-.252-1.513-.553l-1.897-1.62c-.841-.71-2.198-.71-3.014 0L9.615 3.19c-.36.3-1.044.553-1.513.553h-2.1A2.327 2.327 0 0 0 3.683 6.06v2.053c0 .469-.24 1.153-.54 1.501l-1.622 1.91c-.696.828-.696 2.173 0 3.002l1.621 1.909c.3.36.54 1.032.54 1.5v2.03a2.327 2.327 0 0 0 2.318 2.317h2.077c.48 0 1.153.252 1.513.553l1.91 1.633Z"
    />
    <Path
      stroke={IstrokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.002 17.648V11.85M12.995 8.199h.01"
    />
  </Svg>
)
export default ModalInfoIcon;
