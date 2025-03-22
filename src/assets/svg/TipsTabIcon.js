import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
import colors from "../../config/Colors";
const TipsTabIcon = ({color = "#000",...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={29}
    height={29}
    fill="none"
    {...props}
  >
    <G fill={color} clipPath="url(#a)">
      <Path d="M25.375 21.75h-5.438a7.18 7.18 0 0 0-3.625.979V9.063a3.624 3.624 0 0 1 3.625-3.626h1.813V1.813h-1.813a7.228 7.228 0 0 0-5.437 2.47 7.244 7.244 0 0 0-5.438-2.47H0V21.75a3.624 3.624 0 0 0 3.625 3.625h5.438A3.624 3.624 0 0 1 12.687 29h3.626a3.624 3.624 0 0 1 3.625-3.625h5.437A3.624 3.624 0 0 0 29 21.75v-3.625h-3.625v3.625Zm-16.313 0H3.625V5.437h5.438a3.624 3.624 0 0 1 3.624 3.625v13.662a7.222 7.222 0 0 0-3.624-.974ZM29 0h-3.625v7.25H29V0Z" />
      <Path d="M27.188 14.5a1.813 1.813 0 1 0 0-3.625 1.813 1.813 0 0 0 0 3.625Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h29v29H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default TipsTabIcon;
