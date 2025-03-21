import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const SgTipsIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={23}
    fill="none"
    {...props}
  >
    <G fill="#000" clipPath="url(#a)">
      <Path d="M20.125 17.25h-4.313c-1.01 0-2.001.266-2.874.776V7.188a2.874 2.874 0 0 1 2.874-2.875h1.438V1.438h-1.438A5.733 5.733 0 0 0 11.5 3.396a5.745 5.745 0 0 0-4.313-1.958H0V17.25a2.874 2.874 0 0 0 2.875 2.875h4.313A2.874 2.874 0 0 1 10.063 23h2.874a2.874 2.874 0 0 1 2.876-2.875h4.312A2.874 2.874 0 0 0 23 17.25v-2.875h-2.875v2.875Zm-12.938 0H2.875V4.312h4.313a2.874 2.874 0 0 1 2.875 2.875v10.836a5.727 5.727 0 0 0-2.876-.773ZM23 0h-2.875v5.75H23V0Z" />
      <Path d="M21.563 11.5a1.438 1.438 0 1 0 0-2.875 1.438 1.438 0 0 0 0 2.875Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h23v23H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SgTipsIcon;
