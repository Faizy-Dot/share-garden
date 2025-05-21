import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
const MerchantOfferIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={41}
    height={42}
    fill="none"
    {...props}
  >
    <Circle
      cx={20.5}
      cy={21.5}
      r={17.5}
      fill="#fff"
      stroke="#009D89"
      strokeWidth={5}
    />
    <Path
      fill="#000"
      d="M18.478 28.668V13.432h3.457v15.236h-3.457Zm-5.89-5.89v-3.456h15.236v3.456H12.588Z"
    />
  </Svg>
)
export default MerchantOfferIcon;
