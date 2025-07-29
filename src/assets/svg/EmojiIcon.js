import * as React from "react"
import Svg, { Path } from "react-native-svg"
const EmojiIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    fill="none"
    {...props}
  >
    <Path
      fill="#6E6E6E"
      d="M4.577 6.865a.98.98 0 1 1 1.961 0 .98.98 0 0 1-1.961 0Zm6.865.981a.98.98 0 1 0 0-1.961.98.98 0 0 0 0 1.961ZM17 8.5A8.5 8.5 0 1 1 8.5 0 8.51 8.51 0 0 1 17 8.5Zm-1.308 0A7.192 7.192 0 1 0 8.5 15.692 7.2 7.2 0 0 0 15.692 8.5Zm-3.466 1.395a.654.654 0 0 0-.894.239 3.266 3.266 0 0 1-5.664 0 .654.654 0 0 0-1.132.655 4.58 4.58 0 0 0 7.928 0 .654.654 0 0 0-.238-.894Z"
    />
  </Svg>
)
export default EmojiIcon;
