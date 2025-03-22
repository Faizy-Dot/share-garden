import * as React from "react"
import Svg, { Path } from "react-native-svg"
const CrossIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      fillRule="evenodd"
      d="M12.5 23.438c-6.04 0-10.938-4.899-10.938-10.938C1.563 6.46 6.46 1.562 12.5 1.562c6.04 0 10.938 4.899 10.938 10.938 0 6.04-4.897 10.938-10.938 10.938ZM12.5 0C5.596 0 0 5.594 0 12.5S5.596 25 12.5 25 25 19.406 25 12.5 19.404 0 12.5 0Zm4.466 8.031a.792.792 0 0 0-1.113 0l-3.358 3.36-3.31-3.313a.782.782 0 1 0-1.104 1.11l3.31 3.304-3.333 3.336a.793.793 0 0 0 0 1.117.793.793 0 0 0 1.114 0l3.333-3.336 3.31 3.313a.783.783 0 1 0 1.104-1.11l-3.31-3.304 3.357-3.36a.793.793 0 0 0 0-1.117Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default CrossIcon;
