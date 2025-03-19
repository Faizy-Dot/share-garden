import React from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

const BackArrowIcon = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={11}
        height={18}
        fill="none"
        {...props}
      >
        <Path
          fill="#1E1E1E"
          d="M9.35 17.998a1.659 1.659 0 0 1-1.165-.473L.483 10A1.594 1.594 0 0 1 0 8.86c0-.427.174-.837.483-1.14L8.185.26a1.68 1.68 0 0 1 2.03.18 1.582 1.582 0 0 1 .302 1.97L3.916 8.86l6.601 6.45c.31.303.483.713.483 1.14 0 .428-.174.838-.483 1.14a1.65 1.65 0 0 1-1.166.408Z"
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default BackArrowIcon;


