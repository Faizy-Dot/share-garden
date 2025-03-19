import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"
const FilterIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={2}
      d="M6.385 2.846h11.846M13.615 10.231H1.769"
    />
    <Circle cx={3.077} cy={3.077} r={2.077} stroke="#000" strokeWidth={2} />
    <Circle
      cx={16.923}
      cy={10}
      r={2.077}
      stroke="#000"
      strokeWidth={2}
      transform="rotate(-180 16.923 10)"
    />
  </Svg>
)
export default FilterIcon;
