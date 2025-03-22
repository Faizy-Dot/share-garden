import * as React from "react"
import Svg, { Path } from "react-native-svg"
const AdsLocationIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={12}
    fill="none"
    {...props}
  >
    <Path
      stroke="#646262"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.323 2.241a4.612 4.612 0 0 1 3.184-1.24c1.19.005 2.329.462 3.17 1.271A4.261 4.261 0 0 1 10 5.322a4.258 4.258 0 0 1-1.29 3.061L6.321 10.68a1.164 1.164 0 0 1-.806.321c-.302 0-.592-.116-.806-.321L2.323 8.383A4.26 4.26 0 0 1 1 5.313 4.26 4.26 0 0 1 2.323 2.24Z"
    />
    <Path
      stroke="#646262"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.516 6.958c.944 0 1.71-.737 1.71-1.646 0-.908-.766-1.645-1.71-1.645-.945 0-1.711.737-1.711 1.645 0 .909.766 1.646 1.71 1.646Z"
    />
  </Svg>
)
export default AdsLocationIcon;
