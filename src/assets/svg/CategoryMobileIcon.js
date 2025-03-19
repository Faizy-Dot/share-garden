import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CategoryMobileIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={37}
    fill="none"
    {...props}
  >
    <Path
      fill="#FFFFFF" // Changed color to white
      d="M18.5 37H2.584A2.587 2.587 0 0 1 0 34.413V2.587A2.587 2.587 0 0 1 2.584 0H18.5a2.587 2.587 0 0 1 2.584 2.587v31.826A2.587 2.587 0 0 1 18.5 37ZM2.584 1.193a1.394 1.394 0 0 0-1.39 1.394v31.826a1.394 1.394 0 0 0 1.39 1.394H18.5a1.394 1.394 0 0 0 1.39-1.394V2.587a1.394 1.394 0 0 0-1.39-1.394H2.584Z"
    />
    <Path
      fill="#FFFFFF" // Changed color to white
      d="M14.766 3.182H6.318L4.153 1.018l.842-.842 1.816 1.813h7.462L16.089.176l.842.842-2.165 2.164ZM14.523 31.83H6.564v1.192h7.959V31.83Z"
    />
  </Svg>
);

export default CategoryMobileIcon;
